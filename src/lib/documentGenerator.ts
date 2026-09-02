import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

export interface ForumDocData {
  id: string;
  name: string;
  registrationRef: string;
  lgaName: string;
  areaOfCoverage: string;
  stateName: string;
  yearEstablished: number;
  approvedAt?: Date | null;
  coordinatorName: string;
  officeAddress?: string;
}

/**
 * Generates an official Letter of Recognition on the official APC Stakeholder Congress letterhead.
 */
export async function generateLetterOfRecognitionPdf(
  forum: ForumDocData,
  verificationToken: string,
  appUrl: string = process.env.NEXT_PUBLIC_APP_URL || 'https://apcstakeholderscongress.org.ng'
): Promise<Buffer> {
  // 1. Locate and load the official PDF template
  const primaryPath = path.join(process.cwd(), 'resources', 'APC Stakeholders Congress Letter of Recognition.pdf');
  const fallbackPath = path.join(process.cwd(), 'public', 'templates', 'letter_template.pdf');
  
  let templateBytes: Buffer | null = null;
  try {
    if (fs.existsSync(primaryPath)) {
      templateBytes = fs.readFileSync(primaryPath);
    } else if (fs.existsSync(fallbackPath)) {
      templateBytes = fs.readFileSync(fallbackPath);
    }
  } catch (err) {
    console.error('Failed to read official letterhead template:', err);
  }

  let pdfDoc: PDFDocument;
  let page: any;

  if (templateBytes) {
    pdfDoc = await PDFDocument.load(templateBytes);
    page = pdfDoc.getPage(0);
  } else {
    // Fallback if template file is missing
    pdfDoc = await PDFDocument.create();
    page = pdfDoc.addPage([595.28, 841.89]);
  }

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Palette
  const apcGreen = rgb(0.0, 0.53, 0.32); // #008751
  const darkCharcoal = rgb(0.08, 0.1, 0.12);
  const slateText = rgb(0.25, 0.3, 0.35);

  // Format Date string e.g. "2nd September, 2026"
  const dateObj = forum.approvedAt ? new Date(forum.approvedAt) : new Date();
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-GB', { month: 'long' });
  const year = dateObj.getFullYear();
  const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const dateStr = `${day}${nth(day)} ${month}, ${year}`;

  // 1. Mask template placeholders cleanly without touching heading
  page.drawRectangle({
    x: 95,
    y: 568,
    width: 380,
    height: 142,
    color: rgb(1, 1, 1),
  });

  const forumName = forum.name.trim().toUpperCase();
  const nameFontSize = forumName.length > 38 ? 10 : 11;

  // 2. Draw dynamic letter elements
  // Date
  page.drawText(dateStr, {
    x: 104,
    y: 692,
    size: 10,
    font: fontRegular,
    color: slateText,
  });

  // Registration Ref
  page.drawText(`Ref: ${forum.registrationRef}`, {
    x: 104,
    y: 676,
    size: 9.5,
    font: fontBold,
    color: apcGreen,
  });

  // The Chairman/Coordinator
  page.drawText('The Chairman/Coordinator', {
    x: 104,
    y: 646,
    size: 10.5,
    font: fontRegular,
    color: darkCharcoal,
  });

  // [NAME OF FORUM/GROUP]
  page.drawText(forumName, {
    x: 104,
    y: 630,
    size: nameFontSize,
    font: fontBold,
    color: darkCharcoal,
  });

  // Dear Sir/Ma,
  page.drawText('Dear Sir/Ma,', {
    x: 104,
    y: 580,
    size: 11,
    font: fontBold,
    color: darkCharcoal,
  });

  // 3. Generate and Embed Verification QR Code on top right margin
  try {
    const verifyUrl = `${appUrl}/verify/${verificationToken}`;
    const qrPngBuffer = await QRCode.toBuffer(verifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: '#005d37', light: '#ffffff' },
    });
    const qrImage = await pdfDoc.embedPng(qrPngBuffer);
    
    // Position QR Code at top right
    page.drawImage(qrImage, {
      x: 485,
      y: 625,
      width: 60,
      height: 60,
    });

    page.drawText('VERIFY ONLINE', {
      x: 485,
      y: 617,
      size: 6.5,
      font: fontBold,
      color: apcGreen,
    });
  } catch (qrErr) {
    console.error('QR code generation error:', qrErr);
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
