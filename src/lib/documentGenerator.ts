import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

interface ForumDocData {
  id: string;
  name: string;
  registrationRef: string;
  lgaName: string;
  areaOfCoverage: string;
  stateName: string;
  yearEstablished: number;
  approvedAt?: Date | null;
  coordinatorName: string;
}

/**
 * Generates an official Certificate of Registration as an A4 Landscape PDF buffer.
 */
export async function generateCertificatePdf(
  forum: ForumDocData,
  verificationToken: string,
  appUrl: string = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  
  // A4 Landscape: 841.89 x 595.28 points
  const page = pdfDoc.addPage([841.89, 595.28]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Palette
  const brandGreen = rgb(0 / 255, 135 / 255, 81 / 255); // #008751
  const brandDarkGreen = rgb(0 / 255, 93 / 255, 55 / 255);
  const brandGold = rgb(0 / 255, 163 / 255, 224 / 255); // #00A3E0 (Official APC Light Blue)
  const charcoal = rgb(33 / 255, 37 / 255, 41 / 255);
  const lightGrey = rgb(108 / 255, 117 / 255, 125 / 255);
  const bgLight = rgb(248 / 255, 252 / 255, 249 / 255);

  // Background tint
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: bgLight,
  });

  // Outer Border (Green)
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: brandGreen,
    borderWidth: 4,
  });

  // Inner Border (Gold)
  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderColor: brandGold,
    borderWidth: 1.5,
  });

  // Decorative Corner Accents
  const cornerSize = 25;
  const corners = [
    { x: 32, y: height - 32 - cornerSize },
    { x: width - 32 - cornerSize, y: height - 32 - cornerSize },
    { x: 32, y: 32 },
    { x: width - 32 - cornerSize, y: 32 },
  ];
  for (const c of corners) {
    page.drawRectangle({
      x: c.x,
      y: c.y,
      width: cornerSize,
      height: cornerSize,
      borderColor: brandGold,
      borderWidth: 1,
    });
  }

  // Header Title
  const title1 = 'ALL PROGRESSIVES CONGRESS (APC)';
  const t1Width = fontBold.widthOfTextAtSize(title1, 16);
  page.drawText(title1, {
    x: (width - t1Width) / 2,
    y: height - 65,
    size: 16,
    font: fontBold,
    color: brandGreen,
  });

  const title2 = 'APC STAKEHOLDERS CONGRESS';
  const t2Width = fontTimes.widthOfTextAtSize(title2, 24);
  page.drawText(title2, {
    x: (width - t2Width) / 2,
    y: height - 95,
    size: 24,
    font: fontTimes,
    color: brandDarkGreen,
  });

  const subHeader = 'KWARA STATE CHAPTER  •  SECRETARIAT: APC KWARA NORTH HOUSE, FATE ROAD, ILORIN';
  const subWidth = fontRegular.widthOfTextAtSize(subHeader, 9);
  page.drawText(subHeader, {
    x: (width - subWidth) / 2,
    y: height - 112,
    size: 9,
    font: fontRegular,
    color: lightGrey,
  });

  // Motto Banner
  const motto = 'UNITING APC STAKEHOLDERS FOR VICTORY 2027';
  const mottoWidth = fontBold.widthOfTextAtSize(motto, 10);
  page.drawRectangle({
    x: (width - mottoWidth - 40) / 2,
    y: height - 138,
    width: mottoWidth + 40,
    height: 20,
    color: brandGreen,
  });
  page.drawText(motto, {
    x: (width - mottoWidth) / 2,
    y: height - 132,
    size: 10,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  // Certificate Label
  const certLabel = 'CERTIFICATE OF REGISTRATION & ACCREDITATION';
  const certWidth = fontBold.widthOfTextAtSize(certLabel, 18);
  page.drawText(certLabel, {
    x: (width - certWidth) / 2,
    y: height - 180,
    size: 18,
    font: fontBold,
    color: brandGold,
  });

  // Certify statement
  const certifyText = 'This is to officially certify that the organization / support group:';
  const certifyWidth = fontOblique.widthOfTextAtSize(certifyText, 12);
  page.drawText(certifyText, {
    x: (width - certifyWidth) / 2,
    y: height - 215,
    size: 12,
    font: fontOblique,
    color: charcoal,
  });

  // Forum Name (Highlighted)
  const forumName = forum.name.toUpperCase();
  const forumNameSize = forumName.length > 35 ? 18 : 22;
  const nameWidth = fontBold.widthOfTextAtSize(forumName, forumNameSize);
  page.drawText(forumName, {
    x: (width - nameWidth) / 2,
    y: height - 250,
    size: forumNameSize,
    font: fontBold,
    color: brandDarkGreen,
  });

  // Underline
  page.drawLine({
    start: { x: (width - Math.max(nameWidth, 300)) / 2, y: height - 258 },
    end: { x: (width + Math.max(nameWidth, 300)) / 2, y: height - 258 },
    thickness: 1.5,
    color: brandGold,
  });

  // Description / Accreditation text
  const bodyLine1 = `has been duly vetted, accredited, and registered into the official stakeholder database of the APC Stakeholders Congress`;
  const b1Width = fontRegular.widthOfTextAtSize(bodyLine1, 11);
  page.drawText(bodyLine1, {
    x: (width - b1Width) / 2,
    y: height - 285,
    size: 11,
    font: fontRegular,
    color: charcoal,
  });

  const bodyLine2 = `operating within ${forum.lgaName} Local Government Area (${forum.areaOfCoverage}), Kwara State, Nigeria.`;
  const b2Width = fontRegular.widthOfTextAtSize(bodyLine2, 11);
  page.drawText(bodyLine2, {
    x: (width - b2Width) / 2,
    y: height - 302,
    size: 11,
    font: fontRegular,
    color: charcoal,
  });

  const bodyLine3 = `Committed to party loyalty, grassroots mobilization, voter education, and victory for the All Progressives Congress.`;
  const b3Width = fontOblique.widthOfTextAtSize(bodyLine3, 10);
  page.drawText(bodyLine3, {
    x: (width - b3Width) / 2,
    y: height - 322,
    size: 10,
    font: fontOblique,
    color: lightGrey,
  });

  // Structured Info Box
  const issueDateStr = forum.approvedAt
    ? new Date(forum.approvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Details row
  const infoY = height - 380;
  
  // Left: Reg Number & Date
  page.drawText(`Registration No:`, { x: 70, y: infoY + 20, size: 10, font: fontRegular, color: lightGrey });
  page.drawText(forum.registrationRef, { x: 70, y: infoY + 5, size: 13, font: fontBold, color: brandDarkGreen });

  page.drawText(`Date of Issuance:`, { x: 70, y: infoY - 20, size: 10, font: fontRegular, color: lightGrey });
  page.drawText(issueDateStr, { x: 70, y: infoY - 35, size: 11, font: fontBold, color: charcoal });

  // Center: Verification QR Code
  try {
    const verifyUrl = `${appUrl}/verify/${verificationToken}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 100 });
    const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    
    page.drawImage(qrImage, {
      x: (width - 80) / 2,
      y: infoY - 45,
      width: 80,
      height: 80,
    });
    
    const qrSub = 'Scan to verify authenticity';
    const qrSubWidth = fontRegular.widthOfTextAtSize(qrSub, 7);
    page.drawText(qrSub, {
      x: (width - qrSubWidth) / 2,
      y: infoY - 55,
      size: 7,
      font: fontRegular,
      color: lightGrey,
    });
  } catch (e) {
    console.error('QR generation failed:', e);
  }

  // Right: Signature & Signatory
  const sigX = width - 260;
  
  // Try embedding DG signature asset if available
  try {
    const sigPath = path.join(process.cwd(), 'resources', 'DG signature.png');
    if (fs.existsSync(sigPath)) {
      const sigBytes = fs.readFileSync(sigPath);
      const sigImage = await pdfDoc.embedPng(sigBytes);
      page.drawImage(sigImage, {
        x: sigX + 20,
        y: infoY - 10,
        width: 120,
        height: 45,
      });
    }
  } catch (e) {
    // Fallback line if asset unavailable
    page.drawLine({
      start: { x: sigX, y: infoY },
      end: { x: sigX + 180, y: infoY },
      thickness: 1,
      color: charcoal,
    });
  }

  page.drawLine({
    start: { x: sigX, y: infoY - 15 },
    end: { x: sigX + 180, y: infoY - 15 },
    thickness: 1,
    color: brandGold,
  });

  page.drawText('Authorized Directorate Signatory', {
    x: sigX,
    y: infoY - 30,
    size: 10,
    font: fontBold,
    color: charcoal,
  });

  page.drawText('APC Stakeholders Congress, Kwara State', {
    x: sigX,
    y: infoY - 42,
    size: 8,
    font: fontRegular,
    color: lightGrey,
  });

  // Footer security token
  const footerNote = `Security Token: ${verificationToken.slice(0, 16)}... • Official Document of APC Stakeholders Congress • Kwara State`;
  page.drawText(footerNote, {
    x: 45,
    y: 35,
    size: 7,
    font: fontRegular,
    color: lightGrey,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Generates an official Letter of Recognition as an A4 Portrait PDF buffer.
 */
export async function generateLetterOfRecognitionPdf(
  forum: ForumDocData,
  verificationToken: string,
  appUrl: string = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  
  // A4 Portrait: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const brandGreen = rgb(0 / 255, 135 / 255, 81 / 255);
  const brandDarkGreen = rgb(0 / 255, 93 / 255, 55 / 255);
  const brandGold = rgb(0 / 255, 163 / 255, 224 / 255); // #00A3E0 (Official APC Light Blue)
  const charcoal = rgb(33 / 255, 37 / 255, 41 / 255);
  const lightGrey = rgb(100 / 255, 100 / 255, 100 / 255);

  // Top Institutional Header Border
  page.drawRectangle({
    x: 0,
    y: height - 8,
    width,
    height: 8,
    color: brandGreen,
  });

  // Official Letterhead
  const h1 = 'ALL PROGRESSIVES CONGRESS';
  const h1W = fontBold.widthOfTextAtSize(h1, 14);
  page.drawText(h1, { x: (width - h1W) / 2, y: height - 45, size: 14, font: fontBold, color: brandGreen });

  const h2 = 'APC STAKEHOLDERS CONGRESS';
  const h2W = fontTimesBold.widthOfTextAtSize(h2, 20);
  page.drawText(h2, { x: (width - h2W) / 2, y: height - 70, size: 20, font: fontTimesBold, color: brandDarkGreen });

  const h3 = 'KWARA STATE CHAPTER';
  const h3W = fontBold.widthOfTextAtSize(h3, 11);
  page.drawText(h3, { x: (width - h3W) / 2, y: height - 88, size: 11, font: fontBold, color: brandGold });

  const addr = 'Secretariat: APC Kwara North House, Fate Road, Ilorin, Kwara State | Email: apcstakeholderscongress@gmail.com';
  const addrW = fontRegular.widthOfTextAtSize(addr, 8);
  page.drawText(addr, { x: (width - addrW) / 2, y: height - 102, size: 8, font: fontRegular, color: lightGrey });

  // Divider Line
  page.drawLine({
    start: { x: 50, y: height - 112 },
    end: { x: width - 50, y: height - 112 },
    thickness: 1.5,
    color: brandGreen,
  });

  // Date and Reference
  const issueDateStr = forum.approvedAt
    ? new Date(forum.approvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  page.drawText(`Date: ${issueDateStr}`, { x: 50, y: height - 140, size: 10, font: fontRegular, color: charcoal });
  page.drawText(`Ref: APCSC/KW/REC/${forum.registrationRef.split('-')[3] || '001'}`, {
    x: width - 220,
    y: height - 140,
    size: 10,
    font: fontBold,
    color: brandDarkGreen,
  });

  // Recipient
  page.drawText('To:', { x: 50, y: height - 170, size: 10, font: fontBold, color: charcoal });
  page.drawText(`The Coordinator / Executive Committee,`, { x: 50, y: height - 185, size: 11, font: fontBold, color: charcoal });
  page.drawText(forum.name, { x: 50, y: height - 200, size: 12, font: fontBold, color: brandGreen });
  page.drawText(`${forum.lgaName} LGA, ${forum.areaOfCoverage}, Kwara State.`, {
    x: 50,
    y: height - 215,
    size: 10,
    font: fontRegular,
    color: charcoal,
  });

  // Subject
  const subject = `OFFICIAL LETTER OF RECOGNITION AND REGISTRATION`;
  page.drawText(`Dear Stakeholder / Comrade,`, { x: 50, y: height - 245, size: 10, font: fontRegular, color: charcoal });
  
  page.drawText(subject, { x: 50, y: height - 268, size: 11, font: fontBold, color: brandDarkGreen });
  page.drawLine({
    start: { x: 50, y: height - 272 },
    end: { x: 50 + fontBold.widthOfTextAtSize(subject, 11), y: height - 272 },
    thickness: 1,
    color: brandDarkGreen,
  });

  // Letter Body Paragraphs
  const paragraphs = [
    `The Leadership and State Directorate of the APC Stakeholders Congress, Kwara State Chapter, write to formally acknowledge receipt of your registration and congratulate you on the successful verification and accreditation of ${forum.name}.`,
    `Following a comprehensive review of your submission and declared grassroots mobilization capacity across ${forum.lgaName} Local Government Area (${forum.areaOfCoverage}), the Congress officially recognizes your forum as an accredited affiliated support organization working under our unified banner.`,
    `Your unique Registration Reference Number is: ${forum.registrationRef}.`,
    `As an officially recognized association, you are charged with upholding the core values of the Congress: Unity, Loyalty, Service, Integrity, Grassroots First, and Party Supremacy. You are expected to work collaboratively with party structures and the Directorate in mobilizing voters, educating constituents, and ensuring resounding victory for all All Progressives Congress candidates in the forthcoming 2027 general elections.`,
    `Please accept our warmest congratulations. We look forward to active collaboration in advancing our party and serving the good people of Kwara State.`,
  ];

  let currentY = height - 300;
  for (const para of paragraphs) {
    // Word wrap paragraph at 75 chars per line
    const words = para.split(' ');
    let line = '';
    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 10);
      if (testWidth > width - 100) {
        page.drawText(line, { x: 50, y: currentY, size: 10, font: fontRegular, color: charcoal });
        currentY -= 15;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: 50, y: currentY, size: 10, font: fontRegular, color: charcoal });
      currentY -= 22;
    }
  }

  // Closing & Sign-off
  currentY -= 15;
  page.drawText('Yours in Service and Progress,', { x: 50, y: currentY, size: 10, font: fontOblique, color: charcoal });
  currentY -= 15;

  // Signature image
  try {
    const sigPath = path.join(process.cwd(), 'resources', 'DG signature.png');
    if (fs.existsSync(sigPath)) {
      const sigBytes = fs.readFileSync(sigPath);
      const sigImage = await pdfDoc.embedPng(sigBytes);
      page.drawImage(sigImage, {
        x: 50,
        y: currentY - 35,
        width: 100,
        height: 38,
      });
    }
  } catch (e) {
    page.drawLine({
      start: { x: 50, y: currentY - 15 },
      end: { x: 200, y: currentY - 15 },
      thickness: 1,
      color: charcoal,
    });
  }

  currentY -= 45;
  page.drawText('State Directorate / Coordinator General', { x: 50, y: currentY, size: 10, font: fontBold, color: charcoal });
  page.drawText('APC Stakeholders Congress, Kwara State Chapter', { x: 50, y: currentY - 14, size: 9, font: fontRegular, color: lightGrey });

  // Verification QR at bottom right
  try {
    const verifyUrl = `${appUrl}/verify/${verificationToken}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 75 });
    const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    
    page.drawImage(qrImage, {
      x: width - 125,
      y: 60,
      width: 75,
      height: 75,
    });
    
    page.drawText('Scan to Verify Document', {
      x: width - 135,
      y: 50,
      size: 7,
      font: fontRegular,
      color: lightGrey,
    });
  } catch (e) {}

  // Footer bar
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 6,
    color: brandGreen,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
