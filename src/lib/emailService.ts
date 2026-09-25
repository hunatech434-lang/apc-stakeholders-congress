import nodemailer from 'nodemailer';

interface SendRegistrationDocumentsParams {
  toEmail: string;
  coordinatorName: string;
  forumName: string;
  registrationRef: string;
  areaOfCoverage?: string;
  lgaName?: string;
  letterPdfBuffer?: Buffer;
  letterDocId?: string;
}

export async function sendRegistrationDocumentsEmail(
  params: SendRegistrationDocumentsParams
): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const from = process.env.SMTP_FROM || `"Progressive APC Stakeholders Congress" <${user || 'apcstakeholderscongress@gmail.com'}>`;
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apcstakeholderscongress.org.ng';

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

    const downloadLetterUrl = `${appUrl}/api/documents/letter/${params.registrationRef}/download`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Successful - Progressive APC Stakeholders Congress</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 20px; -webkit-font-smoothing: antialiased; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #008751; color: #ffffff; padding: 28px 20px; text-align: center; border-bottom: 4px solid #d4af37; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase; }
        .header p { margin: 6px 0 0 0; font-size: 12px; color: #e1f7eb; font-weight: 500; }
        .content { padding: 28px 24px; font-size: 14px; line-height: 1.6; color: #334155; }
        .congrats-card { background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px; }
        .congrats-title { color: #15803d; font-size: 18px; font-weight: 900; margin: 0 0 4px 0; text-transform: uppercase; }
        .congrats-sub { color: #166534; font-size: 13px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; }
        .forum-highlight { font-size: 16px; font-weight: 800; color: #0f172a; margin: 10px 0; }
        .ref-box { background: #0f172a; color: #ffffff; border-radius: 10px; padding: 16px; text-align: center; margin: 20px 0; }
        .ref-label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .ref-code { font-family: Consolas, Monaco, monospace; font-size: 20px; font-weight: 800; color: #4ade80; letter-spacing: 1px; }
        .letter-card { background: #f8fafc; border: 2px dashed #008751; border-radius: 12px; padding: 18px; text-align: center; margin: 20px 0; }
        .letter-title { color: #008751; font-size: 14px; font-weight: 800; text-transform: uppercase; margin-bottom: 6px; }
        .btn-letter { display: inline-block; background: #008751; color: #ffffff !important; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-weight: 800; font-size: 13px; margin-top: 8px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; background: #f8fafc; border-radius: 8px; overflow: hidden; }
        .info-table td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; }
        .info-table td.label { font-weight: 700; color: #64748b; width: 38%; }
        .info-table td.value { color: #0f172a; font-weight: 600; }
        .quote-box { background: #f8fafc; border-left: 4px solid #008751; padding: 14px 16px; margin: 20px 0; font-style: italic; color: #334155; font-size: 13px; border-radius: 0 8px 8px 0; }
        .notice-box { background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 12px; margin: 16px 0; text-align: center; font-size: 12px; color: #713f12; font-weight: 600; }
        .motto { text-align: center; font-size: 12px; font-weight: 800; color: #008751; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0; }
        .whatsapp-card { background: #022c22; color: #ffffff; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center; }
        .whatsapp-card h3 { margin: 0 0 6px 0; font-size: 15px; color: #facc15; }
        .whatsapp-card p { margin: 0 0 14px 0; font-size: 12px; color: #bbf7d0; }
        .btn-whatsapp { display: inline-block; background: #16a34a; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; font-size: 14px; }
        .portal-link { text-align: center; margin: 16px 0; font-size: 12px; }
        .portal-link a { color: #008751; font-weight: 700; text-decoration: underline; }
        .footer { background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 11px; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>PROGRESSIVE APC STAKEHOLDERS CONGRESS</h1>
          <p>Kwara State Chapter • Directorate of Support Groups & Grassroots Mobilization</p>
        </div>
        
        <div className="content">
          <div className="congrats-card">
            <div className="congrats-title">CONGRATULATIONS!</div>
            <div className="congrats-sub">REGISTRATION SUCCESSFUL</div>
            <div className="forum-highlight">
              Congratulations!<br>
              <strong>${params.forumName}</strong> is now a proud member of the <strong>Progressive APC Stakeholders Congress</strong>.
            </div>
          </div>

          <div className="ref-box">
            <div className="ref-label">Official Registration Reference ID</div>
            <div className="ref-code">${params.registrationRef}</div>
          </div>

          <!-- Official Letter of Recognition Section -->
          <div className="letter-card">
            <div className="letter-title">📄 Official Letter of Recognition</div>
            <p style="margin: 0; font-size: 12px; color: #475569;">
              ${params.letterPdfBuffer ? 'Your official Letter of Recognition has been generated and attached to this email.' : 'Your official Letter of Recognition is ready for download.'}
            </p>
            <a href="${downloadLetterUrl}" className="btn-letter">Download Official Letter (PDF)</a>
          </div>

          <table className="info-table">
            <tr>
              <td className="label">Registered Forum:</td>
              <td className="value">${params.forumName}</td>
            </tr>
            <tr>
              <td className="label">Coordinator:</td>
              <td className="value">${params.coordinatorName}</td>
            </tr>
            ${params.lgaName ? `
            <tr>
              <td className="label">Jurisdiction / Scope:</td>
              <td className="value">${params.lgaName} ${params.areaOfCoverage ? `(${params.areaOfCoverage})` : ''}</td>
            </tr>
            ` : ''}
          </table>

          <div className="quote-box">
            &ldquo;Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027. Thank you for joining the movement to build a stronger party and a better Nigeria.&rdquo;
          </div>

          <div className="notice-box">
            📢 We will contact you with the next steps regarding the Inauguration Ceremony shortly.
          </div>

          <div className="motto">
            One Party. One Vision. One Nigeria.
          </div>

          <!-- Official WhatsApp Community Button -->
          <div className="whatsapp-card">
            <h3>Join Official WhatsApp Community</h3>
            <p>Connect directly with state directors, coordinators, and party leaders across Kwara State.</p>
            <a href="${whatsappLink}" className="btn-whatsapp">Join Official WhatsApp Group</a>
          </div>

          <div className="portal-link">
            Check your registration & letter anytime on the portal: <br>
            <a href="${appUrl}/status?ref=${params.registrationRef}">${appUrl}/status?ref=${params.registrationRef}</a>
          </div>

          <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 20px;">
            For secretariat enquiries or assistance, contact: <strong>07030592380</strong> / <strong>08032010479</strong> / <strong>07031693124</strong> or email <strong>apcstakeholderscongress@gmail.com</strong>
          </p>
        </div>

        <div className="footer">
          <p>© ${new Date().getFullYear()} Progressive APC Stakeholders Congress (Kwara State Chapter). All rights reserved.</p>
          <p>Unity • Service • Progress • Grassroots Mobilization</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const plainText = `
CONGRATULATIONS!
REGISTRATION SUCCESSFUL

Congratulations!
${params.forumName} is now a proud member of the Progressive APC Stakeholders Congress (Kwara State Chapter).

Official Registration Reference ID: ${params.registrationRef}
Coordinator: ${params.coordinatorName}
Jurisdiction: ${params.lgaName || 'Kwara State'} ${params.areaOfCoverage ? `(${params.areaOfCoverage})` : ''}

Download Official Letter of Recognition:
${downloadLetterUrl}

"Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027. Thank you for joining the movement to build a stronger party and a better Nigeria."

We will contact you with the next steps regarding the Inauguration Ceremony shortly.

One Party. One Vision. One Nigeria.

Join Official WhatsApp Group:
${whatsappLink}

Check Portal Status:
${appUrl}/status?ref=${params.registrationRef}

State Secretariat: 07030592380 / 08032010479 / 07031693124
Email: apcstakeholderscongress@gmail.com
    `.trim();

    const mailOptions: any = {
      from,
      to: params.toEmail,
      subject: `Registration Successful - ${params.forumName} (${params.registrationRef})`,
      text: plainText,
      html: htmlContent,
    };

    if (params.letterPdfBuffer) {
      mailOptions.attachments = [
        {
          filename: `Progressive_APC_Letter_of_Recognition_${params.registrationRef}.pdf`,
          content: params.letterPdfBuffer,
          contentType: 'application/pdf',
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    console.log(`[SMTP Success] Confirmation email dispatched to ${params.toEmail}`);
    return { success: true };
  } catch (err: any) {
    console.error('[SMTP Error] Failed to send confirmation email:', err);
    return { success: false, error: err.message };
  }
}
