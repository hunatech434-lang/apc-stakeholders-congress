import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'document';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File exceeds maximum permitted size of 5 MB' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WEBP, PDF, and DOC/DOCX files are permitted.' },
        { status: 400 }
      );
    }

    // Generate safe unique filename
    const ext = path.extname(file.name) || (file.type.includes('pdf') ? '.pdf' : '.jpg');
    const safeExt = ext.replace(/[^a-zA-Z0-9\.]/g, '').toLowerCase();
    const uniqueName = `${documentType}_${crypto.randomBytes(16).toString('hex')}${safeExt}`;

    const uploadDir = path.join(process.cwd(), 'storage', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const targetPath = path.join(uploadDir, uniqueName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({
      success: true,
      filePath: `/storage/uploads/${uniqueName}`,
      url: `/api/files/${uniqueName}`,
      originalFilename: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to process file upload' }, { status: 500 });
  }
}
