import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY not configured - email notifications will be disabled');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = 'Teziuactua <onboarding@resend.dev>';
export const TO_EMAIL = 'jonathanhdezf@gmail.com';

interface SignatureNotificationData {
  nombre: string;
  domicilio: string;
  telefono?: string;
  totalSignatures: number;
  timestamp: string;
}

export async function sendSignatureNotification(data: SignatureNotificationData) {
  if (!resend) {
    console.warn('Email notifications disabled - RESEND_API_KEY not configured');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const { nombre, domicilio, telefono, totalSignatures, timestamp } = data;

    const { data: email, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `🔔 Nueva firma registrada (#${totalSignatures}) - Teziuactua`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Firma - Teziuactua</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 560px; width: 100%; border-collapse: collapse; background-color: #141414; border-radius: 16px; overflow: hidden; border: 1px solid rgba(249,115,22,0.2);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%); padding: 32px 40px; text-align: center;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #000; letter-spacing: -0.02em;">¡Nueva Firma Recibida!</h1>
                      <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(0,0,0,0.7); font-weight: 600;">Petición Ciudadana · Teziuactua</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 32px 40px;">
                      
                      <!-- Signature Count Badge -->
                      <div style="text-align: center; margin-bottom: 32px;">
                        <div style="display: inline-block; background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.3); border-radius: 100px; padding: 8px 20px;">
                          <span style="font-size: 14px; font-weight: 700; color: #f97316;">Total de firmas: <strong style="font-size: 18px;">${totalSignatures}</strong></span>
                        </div>
                      </div>
                      
                      <!-- Citizen Data -->
                      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                        <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 0.1em;">Datos del Ciudadano</h2>
                        
                        <div style="margin-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Nombre completo</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: 600;">${nombre}</p>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Domicilio</p>
                          <p style="margin: 0; font-size: 14px; color: #ffffff;">${domicilio}</p>
                        </div>
                        
                        ${telefono ? `
                        <div>
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Teléfono</p>
                          <p style="margin: 0; font-size: 14px; color: #ffffff;">${telefono}</p>
                        </div>
                        ` : ''}
                      </div>
                      
                      <!-- Timestamp -->
                      <p style="margin: 0; font-size: 12px; color: #525252; text-align: center;">
                        Registrado el: ${timestamp}
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: rgba(249,115,22,0.05); border-top: 1px solid rgba(249,115,22,0.1); padding: 24px 40px; text-align: center;">
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #a3a3a3;">Este correo fue enviado automáticamente por el sistema de Teziuactua.</p>
                      <p style="margin: 0; font-size: 12px; color: #525252;">Reforma Teziupark · Petición Ciudadana · Teziutlán, Puebla</p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', email?.id);
    return { success: true, emailId: email?.id };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error };
  }
}
