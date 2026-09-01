import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateLetterOfRecognitionPdf } from '@/lib/documentGenerator';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doc = await prisma.generatedDocument.findUnique({
      where: { id },
      include: { 
        forum: {
          include: { lga: true }
        }
      },
    });

    if (!doc || doc.isRevoked) {
      return NextResponse.json({ error: 'Document not found or has been revoked' }, { status: 404 });
    }

    let fileBuffer: Buffer | null = null;
    const filename = path.basename(doc.filePath);
    const diskPath = path.join(process.cwd(), 'storage', 'generated', filename);
    const tmpPath = path.join(os.tmpdir(), 'storage', 'generated', filename);

    if (fs.existsSync(diskPath)) {
      try {
        fileBuffer = fs.readFileSync(diskPath);
      } catch (e) {}
    } else if (fs.existsSync(tmpPath)) {
      try {
        fileBuffer = fs.readFileSync(tmpPath);
      } catch (e) {}
    }

    // Dynamic Serverless On-Demand Fallback
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
        officeAddress: doc.forum.officeAddress,
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
      ? `APC_Certificate_${doc.forum.registrationRef}.pdf`
      : `APC_Letter_of_Recognition_${doc.forum.registrationRef}.pdf`;

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
