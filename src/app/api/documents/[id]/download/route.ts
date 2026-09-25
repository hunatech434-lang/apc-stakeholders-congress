import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateLetterOfRecognitionPdf } from '@/lib/documentGenerator';
import { generateVerificationToken } from '@/lib/refGenerator';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cleanId = id.trim();

    let doc = await prisma.generatedDocument.findUnique({
      where: { id: cleanId },
      include: { 
        forum: {
          include: { lga: true }
        }
      },
    });

    let fileBuffer: Buffer | null = null;

    // If not found by primary doc ID, check by registrationRef or forumId
    if (!doc) {
      const forum = await prisma.forum.findFirst({
        where: {
          OR: [
            { registrationRef: { equals: cleanId, mode: 'insensitive' } },
            { id: cleanId },
          ],
        },
        include: { lga: true },
      });

      if (!forum || forum.status === 'rejected' || forum.status === 'suspended_revoked') {
        return NextResponse.json({ error: 'Valid forum registration record not found' }, { status: 404 });
      }

      // Check if document exists for this forum
      doc = await prisma.generatedDocument.findFirst({
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

      if (!doc) {
        // Auto-generate on-the-fly for previously registered or interim-registered groups
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
    }

    if (!doc || doc.isRevoked) {
      return NextResponse.json({ error: 'Document not found or has been revoked' }, { status: 404 });
    }

    // Dynamic On-Demand Generation with latest official Progressive APC letterhead
    if (!fileBuffer) {
      const docForumData = {
        id: doc.forum.id,
        name: doc.forum.name,
        registrationRef: doc.forum.registrationRef,
        lgaName: doc.forum.lga?.name || 'Kwara State',
        areaOfCoverage: doc.forum.areaOfCoverage,
        stateName: 'Kwara State',
        yearEstablished: doc.forum.yearEstablished,
        approvedAt: doc.forum.approvedAt || doc.issuedAt,
        coordinatorName: doc.forum.coordinatorName,
        officeAddress: doc.forum.officeAddress || undefined,
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

    const isCert = doc.docType === 'certificate_of_registration';
    const downloadName = isCert
      ? `Progressive_APC_Certificate_${doc.forum.registrationRef}.pdf`
      : `Progressive_APC_Letter_of_Recognition_${doc.forum.registrationRef}.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadName}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Document download error:', error);
    return NextResponse.json({ error: 'Failed to download document' }, { status: 500 });
  }
}
