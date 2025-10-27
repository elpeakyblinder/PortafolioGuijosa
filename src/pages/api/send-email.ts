export const prerender = false;

import type { APIContext } from 'astro';
import nodemailer from 'nodemailer';

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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: import.meta.env.GMAIL_USER,
                pass: import.meta.env.GMAIL_APP_PASS,
            },
        });

        const emailHtmlBody = `
            <p><strong>Nuevo mensaje de contacto: ${data.name} quiere contactarte.</strong></p>
            <hr>
            <p><strong>Datos del Interesado:</strong></p>
            <ul>
                <li><strong>Nombre:</strong> ${data.name}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Teléfono:</strong> ${data.number || 'No proporcionado'}</li>
                <li><strong>Servicio de Interés:</strong> ${data.service}</li>
            </ul>
            <hr>
            <p><strong>Mensaje: del interesado</strong></p>
            <p>${data.message?.replace(/\n/g, '<br>')}</p>
            <hr>
        `;

        const mailOptions = {
            from: `"Portafolio Guijosa" <${import.meta.env.GMAIL_USER}>`,
            to: import.meta.env.GMAIL_USER,
            replyTo: data.email,
            subject: `Nuevo Contacto: ${data.name} - ${data.service}`,
            html: emailHtmlBody,
        };

        await transporter.sendMail(mailOptions);

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
