export const prerender = false;

import type { APIContext } from 'astro';
import { Resend } from 'resend';

interface FormData {
    name: string | null;
    email: string | null;
    number?: string | null;
    service: string | null;
    message: string | null;
}

export async function POST({ request }: APIContext): Promise<Response> {
    try {
        const formData = await request.formData();
        const data: FormData = {
            name: formData.get('name') as string | null,
            email: formData.get('email') as string | null,
            number: formData.get('number') as string | null,
            service: formData.get('service') as string | null,
            message: formData.get('message') as string | null,
        };

        if (!data.name || !data.email || !data.service || !data.message) {
            return new Response(
                JSON.stringify({ error: 'Faltan campos requeridos' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const resend = new Resend(import.meta.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: import.meta.env.RESEND_FROM_EMAIL,
            to: import.meta.env.CONTACT_EMAIL,
            replyTo: data.email,
            subject: `Nuevo Contacto: ${data.name} - ${data.service}`,
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#1a1a2e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a2e;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#222831;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#222831 0%,#31363F 100%);padding:32px 40px;border-bottom:3px solid #76ABAE;">
              <h1 style="margin:0;font-size:22px;color:#76ABAE;font-weight:600;letter-spacing:0.5px;">guijosa.dev</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#b0b0b0;">Nuevo mensaje de contacto</p>
            </td>
          </tr>
          <!-- Alert -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#76ABAE15;border-left:4px solid #76ABAE;border-radius:0 8px 8px 0;padding:16px 20px;">
                <tr>
                  <td style="color:#EEEEEE;font-size:15px;font-weight:600;">
                    ${data.name} quiere contactarte
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Contact Info -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h2 style="margin:0 0 16px;font-size:14px;color:#76ABAE;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Datos del interesado</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#31363F;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #222831;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Nombre</span><br>
                    <span style="color:#EEEEEE;font-size:15px;font-weight:500;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #222831;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br>
                    <a href="mailto:${data.email}" style="color:#76ABAE;font-size:15px;text-decoration:none;font-weight:500;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #222831;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Teléfono</span><br>
                    <span style="color:#EEEEEE;font-size:15px;font-weight:500;">${data.number || 'No proporcionado'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Servicio de interés</span><br>
                    <span style="display:inline-block;margin-top:4px;padding:4px 12px;background-color:#76ABAE20;color:#76ABAE;border-radius:20px;font-size:13px;font-weight:600;border:1px solid #76ABAE40;">${data.service}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h2 style="margin:0 0 12px;font-size:14px;color:#76ABAE;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Mensaje</h2>
              <div style="background-color:#31363F;border-radius:8px;padding:20px;color:#EEEEEE;font-size:14px;line-height:1.7;">
                ${data.message?.replace(/\n/g, '<br>')}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #31363F;padding-top:20px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#b0b0b0;">Enviado desde el formulario de contacto de <a href="https://guijosa.dev" style="color:#76ABAE;text-decoration:none;font-weight:600;">guijosa.dev</a></p>
                  </td>
                </tr>
              </table>
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
            console.error('Error Resend:', error);
            return new Response(
                JSON.stringify({ error: 'Error al enviar el mensaje.' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Confirmación al cliente
        await resend.emails.send({
            from: import.meta.env.RESEND_FROM_EMAIL,
            to: data.email,
            subject: `¡Mensaje recibido! — Carlos Guijosa`,
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#1a1a2e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a2e;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#222831;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#222831 0%,#31363F 100%);padding:32px 40px;border-bottom:3px solid #76ABAE;">
              <h1 style="margin:0;font-size:22px;color:#76ABAE;font-weight:600;letter-spacing:0.5px;">Carlos Guijosa</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#b0b0b0;">Desarrollador Full Stack</p>
            </td>
          </tr>
          <!-- Greeting -->
          <tr>
            <td style="padding:32px 40px 0;">
              <h2 style="margin:0;font-size:20px;color:#EEEEEE;font-weight:600;">¡Hola ${data.name}!</h2>
              <p style="margin:12px 0 0;color:#b0b0b0;font-size:15px;line-height:1.6;">
                He recibido tu mensaje correctamente. Gracias por tomarte el tiempo de contactarme, me pondré en contacto contigo en las próximas <strong style="color:#76ABAE;">24 horas</strong>.
              </p>
            </td>
          </tr>
          <!-- Summary -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h3 style="margin:0 0 16px;font-size:14px;color:#76ABAE;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Resumen de tu mensaje</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#31363F;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #222831;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Servicio de interés</span><br>
                    <span style="display:inline-block;margin-top:4px;padding:4px 12px;background-color:#76ABAE20;color:#76ABAE;border-radius:20px;font-size:13px;font-weight:600;border:1px solid #76ABAE40;">${data.service}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Tu mensaje</span><br>
                    <span style="color:#EEEEEE;font-size:14px;line-height:1.6;display:block;margin-top:6px;">${data.message?.replace(/\n/g, '<br>')}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:28px 40px 0;" align="center">
              <a href="https://guijosa.dev" style="display:inline-block;padding:12px 32px;background-color:#76ABAE;color:#222831;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.5px;">Visitar mi portafolio</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #31363F;padding-top:20px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:12px;color:#b0b0b0;">Este es un correo automático, no es necesario responder.</p>
                    <p style="margin:0;font-size:12px;color:#b0b0b0;">
                      <a href="https://guijosa.dev" style="color:#76ABAE;text-decoration:none;font-weight:600;">guijosa.dev</a> · Morelia, Michoacán
                    </p>
                  </td>
                </tr>
              </table>
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

        return new Response(
            JSON.stringify({ message: 'Mensaje enviado con éxito' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error al enviar email:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno al enviar el mensaje.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
