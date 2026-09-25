import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateLetterOfRecognitionPdf } from '@/lib/documentGenerator';
import { generateVerificationToken } from '@/lib/refGenerator';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const cleanRef = ref?.trim();

    if (!cleanRef) {
      return NextResponse.json({ error: 'Missing registration reference' }, { status: 400 });
    }

    const forum = await prisma.forum.findFirst({
      where: {
        OR: [
          { registrationRef: { equals: cleanRef, mode: 'insensitive' } },
          { id: cleanRef },
        ],
      },
      include: { lga: true },
    });

    if (!forum) {
      return NextResponse.json({ error: 'Forum registration record not found' }, { status: 404 });
    }

    if (forum.status === 'rejected' || forum.status === 'suspended_revoked') {
      return NextResponse.json({ error: 'Forum registration is not active or approved' }, { status: 403 });
    }

    // Check for existing document
    let doc = await prisma.generatedDocument.findFirst({
      where: {
        forumId: forum.id,
        docType: 'letter_of_recognition',
        isRevoked: false,
      },
      include: {
        forum: {
          include: { lga: true },
        },
      },
    });

    let fileBuffer: Buffer | null = null;

    if (!doc) {
      // Auto-generate on-demand for existing or suspended-period forum
      const token = generateVerificationToken();
      const docForumData = {
        id: forum.id,
        name: forum.name,
        registrationRef: forum.registrationRef,
        lgaName: forum.lga?.name || 'Kwara State',
        areaOfCoverage: forum.areaOfCoverage,
        stateName: 'Kwara State',
        yearEstablished: forum.yearEstablished,
        approvedAt: forum.approvedAt || forum.createdAt,
        coordinatorName: forum.coordinatorName,
        officeAddress: forum.officeAddress || undefined,
      };

      const generatedBuf = await generateLetterOfRecognitionPdf(docForumData, token);
      const fileName = `letter_${forum.registrationRef.replace(/[^a-zA-Z0-9]/g, '_')}_${token.slice(0, 8)}.pdf`;

      doc = await prisma.generatedDocument.create({
        data: {
          forumId: forum.id,
          docType: 'letter_of_recognition',
          verificationToken: token,
          filePath: `/storage/generated/${fileName}`,
          fileSizeBytes: generatedBuf.length,
        },
        include: {
          forum: {
            include: { lga: true },
          },
        },
      });

      fileBuffer = generatedBuf;
    }

    // Dynamic On-Demand Generation with latest official Progressive APC letterhead
    if (!fileBuffer) {
      const docForumData = {
        id: forum.id,
        name: forum.name,
        registrationRef: forum.registrationRef,
        lgaName: forum.lga?.name || 'Kwara State',
        areaOfCoverage: forum.areaOfCoverage,
        stateName: 'Kwara State',
        yearEstablished: forum.yearEstablished,
        approvedAt: forum.approvedAt || doc.issuedAt,
        coordinatorName: forum.coordinatorName,
        officeAddress: forum.officeAddress || undefined,
      };

      fileBuffer = await generateLetterOfRecognitionPdf(docForumData, doc.verificationToken);
    }

    if (!fileBuffer) {
      return NextResponse.json({ error: 'Failed to generate document artifact' }, { status: 500 });
    }

    // Update download count & log (non-blocking / error-tolerant)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    prisma.$transaction([
      prisma.generatedDocument.update({
        where: { id: doc.id },
        data: { downloadCount: { increment: 1 } },
      }),
      prisma.documentDownloadLog.create({
        data: {
          generatedDocId: doc.id,
          forumId: doc.forumId,
          ipAddress: ip,
          userAgent: userAgent,
        },
      }),
    ]).catch((logErr) => console.warn('Download count update error:', logErr));

    const downloadName = `Progressive_APC_Letter_of_Recognition_${forum.registrationRef}.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadName}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Letter download error:', error);
    return NextResponse.json({ error: 'Failed to download letter of recognition' }, { status: 500 });
  }
}
