import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doc = await prisma.generatedDocument.findUnique({
      where: { id },
      include: { forum: true },
    });

    if (!doc || doc.isRevoked) {
      return NextResponse.json({ error: 'Document not found or has been revoked' }, { status: 404 });
    }

    // Resolve file on disk
    const filename = path.basename(doc.filePath);
    const diskPath = path.join(process.cwd(), 'storage', 'generated', filename);

    if (!fs.existsSync(diskPath)) {
      return NextResponse.json({ error: 'Physical document artifact missing' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(diskPath);

    // Update download count & log
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    await prisma.$transaction([
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
    ]);

    const isCert = doc.docType === 'certificate_of_registration';
    const downloadName = isCert
      ? `APC_Certificate_${doc.forum.registrationRef}.pdf`
      : `APC_Letter_of_Recognition_${doc.forum.registrationRef}.pdf`;

    return new NextResponse(fileBuffer, {
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
