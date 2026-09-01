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
  appUrl: string = process.env.NEXT_PUBLIC_APP_URL || 'https://apc-stakeholders-congress.vercel.app'
): Promise<Buffer> {
  // 1. Locate and load the official PDF template
  const templatePath = path.join(process.cwd(), 'resources', 'APC Stakeholders Congress Letter of Recognition.pdf');
  let templateBytes: Buffer | null = null;
  try {
    if (fs.existsSync(templatePath)) {
      templateBytes = fs.readFileSync(templatePath);
    }
  } catch (err) {
    console.error('Failed to read official letterhead template from resources:', err);
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

  // Format Date string e.g. "1st September, 2026"
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

  // 1. Seamlessly cover template placeholders:
  // Cover [DATE], [NAME OF FORUM/GROUP], [ADDRESS OF FORUM/GROUP]
  page.drawRectangle({
    x: 95,
    y: 610,
    width: 380,
    height: 75,
    color: rgb(1, 1, 1),
  });

  // Cover "Dear Coordinator,," to replace with formatted coordinator salutation
  page.drawRectangle({
    x: 95,
    y: 565,
    width: 250,
    height: 25,
    color: rgb(1, 1, 1),
  });

  // 2. Draw dynamic forum details
  // Date
  page.drawText(dateStr, {
    x: 104,
    y: 668,
    size: 10,
    font: fontRegular,
    color: slateText,
  });

  // Registration Ref
  page.drawText(`Ref: ${forum.registrationRef}`, {
    x: 104,
    y: 654,
    size: 9.5,
    font: fontBold,
    color: apcGreen,
  });

  // Forum Name (Bold, Dark)
  const forumNameUpper = forum.name.toUpperCase();
  const nameFontSize = forumNameUpper.length > 40 ? 9.5 : 10.5;
  page.drawText(forumNameUpper, {
    x: 104,
    y: 636,
    size: nameFontSize,
    font: fontBold,
    color: darkCharcoal,
  });

  // Address & LGA / Scope
  const addressLine = forum.officeAddress
    ? `${forum.officeAddress} (${forum.lgaName} LGA, ${forum.areaOfCoverage})`
    : `${forum.lgaName} LGA, ${forum.areaOfCoverage}, Kwara State`;
  const truncatedAddress = addressLine.length > 65 ? addressLine.slice(0, 62) + '...' : addressLine;

  page.drawText(truncatedAddress, {
    x: 104,
    y: 620,
    size: 9,
    font: fontRegular,
    color: slateText,
  });

  // Salutation
  const coordinatorGreeting = forum.coordinatorName
    ? `Dear Coordinator (${forum.coordinatorName}),`
    : `Dear Coordinator,`;
  page.drawText(coordinatorGreeting, {
    x: 104,
    y: 572,
    size: 10.5,
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
      y: 618,
      width: 60,
      height: 60,
    });

    page.drawText('VERIFY ONLINE', {
      x: 485,
      y: 610,
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
