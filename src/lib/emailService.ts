import nodemailer from 'nodemailer';

interface SendRegistrationDocumentsParams {
  toEmail: string;
  coordinatorName: string;
  forumName: string;
  registrationRef: string;
  areaOfCoverage: string;
  lgaName: string;
  certificatePdfBuffer?: Buffer;
  letterPdfBuffer?: Buffer;
  certDownloadUrl?: string;
  letterDownloadUrl?: string;
}

export async function sendRegistrationDocumentsEmail(params: SendRegistrationDocumentsParams): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const from = process.env.SMTP_FROM || `"APC Stakeholders Congress" <${user || 'apcstakeholderscongress@gmail.com'}>`;
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apcstakeholderscongress.ng';

  if (!params.toEmail || !params.toEmail.includes('@')) {
    return { success: false, error: 'No valid recipient email address provided.' };
  }

  // If user/pass are not yet provided in .env, log and return graceful status
  if (!user || !pass) {
    console.log(`[SMTP Notice] Email to ${params.toEmail} skipped: SMTP_USER or SMTP_PASS not yet configured in .env`);
    return { success: false, error: 'SMTP credentials pending in .env' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const attachments: any[] = [];
    if (params.certificatePdfBuffer) {
      attachments.push({
        filename: `APC_Certificate_of_Registration_${params.registrationRef}.pdf`,
        content: params.certificatePdfBuffer,
        contentType: 'application/pdf',
      });
    }

    if (params.letterPdfBuffer) {
      attachments.push({
        filename: `APC_Letter_of_Recognition_${params.registrationRef}.pdf`,
        content: params.letterPdfBuffer,
        contentType: 'application/pdf',
      });
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Official Accreditation & Documents - APC Stakeholders Congress</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
        .header { background: #008751; color: #ffffff; padding: 30px 24px; text-align: center; border-bottom: 4px solid #d4af37; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #e1f7eb; font-weight: 500; }
        .content { padding: 28px 24px; font-size: 14px; line-height: 1.6; color: #334155; }
        .badge { display: inline-block; background: #f1fbf6; color: #007545; border: 1px solid #c2eed7; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 12px; margin-bottom: 16px; }
        .ref-box { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0; }
        .ref-code { font-family: monospace; font-size: 20px; font-weight: 800; color: #005d37; letter-spacing: 1px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
        .info-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
        .info-table td.label { font-weight: 700; color: #64748b; width: 40%; }
        .info-table td.value { color: #0f172a; font-weight: 600; }
        .btn-container { text-align: center; margin: 26px 0 16px 0; }
        .btn { display: inline-block; background: #008751; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; margin: 4px; }
        .btn-whatsapp { background: #16a34a; }
        .whatsapp-card { background: #022c22; color: #ffffff; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center; }
        .whatsapp-card h3 { margin: 0 0 8px 0; font-size: 16px; color: #f1d064; }
        .whatsapp-card p { margin: 0 0 14px 0; font-size: 12px; color: #c2eed7; }
        .footer { background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 11px; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>APC STAKEHOLDERS CONGRESS</h1>
          <p>Kwara State Chapter • Uniting APC Stakeholders for Victory 2027</p>
        </div>
        
        <div className="content">
          <div className="badge">✓ REGISTRATION APPROVED & ACCREDITED</div>
          
          <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Congratulations, ${params.coordinatorName}!</h2>
          <p>
            Your organization, <strong>${params.forumName}</strong>, has been officially registered and accredited under the <strong>APC Stakeholders Congress (Kwara State Chapter)</strong>.
          </p>
          
          <div className="ref-box">
            <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Official Registration Reference</div>
            <div className="ref-code">${params.registrationRef}</div>
          </div>

          <table className="info-table">
            <tr>
              <td className="label">Forum Name:</td>
              <td className="value">${params.forumName}</td>
            </tr>
            <tr>
              <td className="label">Coordinator:</td>
              <td className="value">${params.coordinatorName}</td>
            </tr>
            <tr>
              <td className="label">Jurisdiction / Scope:</td>
              <td className="value">${params.lgaName} • ${params.areaOfCoverage}</td>
            </tr>
          </table>

            <p style="margin: 0 0 16px 0;">
              Your forum details and declared grassroots strength have been officially cataloged in the State Directorate registry. Attached to this email is your official <strong>Letter of Recognition (PDF)</strong>.
            </p>

            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #166534; font-weight: bold;">
                Official Registration Reference
              </p>
              <p style="margin: 0; font-size: 20px; font-weight: 800; font-family: monospace; color: #008751;">
                ${params.registrationRef}
              </p>
            </div>

            <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569;">
              <strong>Note:</strong> Official Certificates of Registration will be presented physically at the upcoming State Stakeholders Convention / Secretariat.
            </p>

          <div className="btn-container">
            <a href="${appUrl}/status?ref=${params.registrationRef}" className="btn">View Online Portal Status</a>
          </div>

          <!-- Restricted WhatsApp Community -->
          <div className="whatsapp-card">
            <h3>Exclusive Coordinator WhatsApp Group</h3>
            <p>Join the verified community of forum leaders, senatorial directors, and state coordinators across Kwara State.</p>
            <a href="${whatsappLink}" className="btn btn-whatsapp">Join Official WhatsApp Group</a>
          </div>

          <p style="font-size: 12px; color: #64748b;">
            For enquiries or secretariat appointments, contact the State Secretariat at <em>APC Kwara North House, Fate Road, Ilorin</em> or call 07030592380 / 08032010479.
          </p>
        </div>

        <div className="footer">
          <p>© ${new Date().getFullYear()} APC Stakeholders Congress (Kwara State Chapter). All rights reserved.</p>
          <p>Core Values: Unity • Loyalty • Service • Integrity • Grassroots First • Party Supremacy</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from,
      to: params.toEmail,
      subject: `Official Accreditation & Registration Documents - ${params.forumName} (${params.registrationRef})`,
      html: htmlContent,
      attachments,
    });

    console.log(`[SMTP Success] Accreditation email and documents dispatched to ${params.toEmail}`);
    return { success: true };
  } catch (err: any) {
    console.error('[SMTP Error] Failed to send registration email:', err);
    return { success: false, error: err.message };
  }
}
