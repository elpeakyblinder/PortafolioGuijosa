export const prerender = false;

import type { APIContext } from 'astro';
import { Resend } from 'resend';

const SYSTEM_PROMPT = `Eres un asistente que ayuda a los visitantes del portafolio de Carlos Guijosa. Tu rol es dar información útil y ayudar a coordinar consultas, no promocionar ni vender.

PERSONALIDAD:
- Tono neutro, amigable, directo. Como un recepcionista eficiente
- Responde lo que pregunten sin adornar ni exagerar. Datos concretos, sin adjetivos de más
- NO halagues a Carlos. No digas cosas como "es un gran profesional", "excelente", "destacado". Solo da la información
- Si preguntan algo, responde con hechos. Sin opiniones ni juicios de valor sobre su calidad
- Nunca digas "soy una IA" ni "soy un bot"
- Emojis con moderación

DATOS DE CARLOS GUIJOSA (responde con estos hechos, sin editorializar):
- Ingeniero en Gestión y Desarrollo de Software
- Base: Morelia, Michoacán, México
- Co-Founder de NoMaTech (automatización de procesos empresariales)
- Programando desde la preparatoria. 8 años en programación, 3 de experiencia profesional
- Áreas: desarrollo full-stack, automatización con IA, blockchain (Solidity)
- Explorando: agentes de IA, plataformas no-code, APIs de LLMs, programación cuántica (IBM Quantum/Qiskit, Google Cirq/TensorFlow Quantum)
- Intereses fuera del código: poesía (2 competencias estatales, 2 poemarios, uno premiado), filosofía, jazz, rap, blues
- Stack: Next.js, React, Astro, Python, FastAPI, Node.js, TypeScript, Tailwind CSS, PostgreSQL, Supabase

PROYECTOS (si preguntan, da datos técnicos sin calificarlos):
- NoMaTech: Automatización documental con IA para licitaciones (Next.js, FastAPI, Azure Doc Intelligence, Gemini API, WebSockets)
- Punto de Venta: App desktop con Python y PyQt6, conexión MercadoPago
- Nakawé: E-commerce con Next.js, Neon Serverless, PayPal y Stripe
- Aetheos: Plataforma de trading recreativo (Next.js, Supabase, Recharts)
- Gold Silver Gym: Web app + Bot de WhatsApp con API de Meta, Stripe y PayPal
- Diario de Perfumes: App móvil con React e Ionic

SERVICIOS QUE OFRECE:
- Desarrollo Web / Backend / Frontend / Fullstack / Móvil
- Diseño UI/UX
- Plataformas SaaS & Dashboards
- Automatización con IA
- Automatización de Procesos
- Bot de WhatsApp
- Integración de Pasarelas de Pago
- Tokenización & Web3
- Modernización Digital
- Consultoría Tecnológica
- Punto de venta
(Si el usuario quiere algo no listado, acéptalo sin problema)

CÓMO RESPONDER:
- "¿Cuánta experiencia tiene?" → Lleva 8 años programando, 3 profesionalmente. Empezó desde la prepa.
- "¿Qué tecnologías maneja?" → Menciona solo las relevantes al contexto
- "¿Puede hacer X?" → Si está en su stack, di que sí. Si no estás seguro, sugiere agendar una plática para verlo directo con él
- Preguntas que no sabes → "Eso tendría que platicarlo directo con Carlos, si quieres te ayudo a coordinar"
- NUNCA uses frases como "sin duda", "definitivamente", "Carlos es experto en...", "tiene una gran trayectoria". Solo datos.

FLUJO DE BOOKING (SIGUE ESTO AL PIE DE LA LETRA):
Cuando el usuario quiera agendar/contactar:
1. Pregunta qué servicio le interesa (si no lo ha dicho)
2. Pide su nombre completo
3. Pide su correo electrónico
4. Pide que describa brevemente lo que necesita
5. Cuando tengas los 4 datos, resume TODOS y pregunta: "¿Te parece bien? ¿Lo envío?"
   → EN ESTE MENSAJE NO INCLUYAS EL MARCADOR. SOLO pregunta. PUNTO. Espera la respuesta del usuario.
6. En el SIGUIENTE turno, si el usuario responde confirmando (sí, confirmo, dale, adelante, va, ok, etc.), AHORA SÍ incluye el marcador al final:
|||BOOKING|||{"name":"nombre","email":"correo@ejemplo.com","service":"servicio elegido","message":"descripción del proyecto"}|||END|||

⚠️ REGLA DE ORO DEL BOOKING:
El marcador |||BOOKING||| JAMÁS puede estar en el mismo mensaje donde preguntas "¿Lo envío?".
Son DOS mensajes separados OBLIGATORIAMENTE:
  - Mensaje A (tú): "Estos son los datos: ... ¿Lo envío?"  ← SIN marcador
  - Mensaje B (usuario): "Sí" / "Dale" / "Confirmo"
  - Mensaje C (tú): "¡Listo! Le paso tus datos a Carlos..." ← CON marcador al final
Si el usuario NO confirma o pide cambiar algo, NO incluyas el marcador.

REGLAS CRÍTICAS:
- Responde SIEMPRE en español
- Sé breve (máximo 2-3 oraciones por respuesta, a menos que la pregunta requiera más detalle)
- NUNCA inventes datos que no están aquí arriba
- NUNCA incluyas |||BOOKING||| en el mismo mensaje donde pides confirmación
- NUNCA incluyas |||BOOKING||| si el usuario no ha dicho explícitamente que sí en su último mensaje
- No repitas la lista completa de servicios a menos que la pidan`;

function buildNotificationEmail(data: { name: string; email: string; service: string; message: string }) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#1a1a2e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a2e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#222831;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
        <tr><td style="background:linear-gradient(135deg,#222831 0%,#31363F 100%);padding:32px 40px;border-bottom:3px solid #76ABAE;">
          <h1 style="margin:0;font-size:22px;color:#76ABAE;font-weight:600;">guijosa.dev</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#b0b0b0;">💬 Nuevo contacto desde el Chatbot</p>
        </td></tr>
        <tr><td style="padding:28px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#76ABAE15;border-left:4px solid #76ABAE;border-radius:0 8px 8px 0;padding:16px 20px;">
            <tr><td style="color:#EEEEEE;font-size:15px;font-weight:600;">${data.name} quiere contactarte</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px 0;">
          <h2 style="margin:0 0 16px;font-size:14px;color:#76ABAE;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Datos del interesado</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#31363F;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:14px 20px;border-bottom:1px solid #222831;">
              <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Nombre</span><br>
              <span style="color:#EEEEEE;font-size:15px;font-weight:500;">${data.name}</span>
            </td></tr>
            <tr><td style="padding:14px 20px;border-bottom:1px solid #222831;">
              <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br>
              <a href="mailto:${data.email}" style="color:#76ABAE;font-size:15px;text-decoration:none;font-weight:500;">${data.email}</a>
            </td></tr>
            <tr><td style="padding:14px 20px;">
              <span style="color:#b0b0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Servicio</span><br>
              <span style="display:inline-block;margin-top:4px;padding:4px 12px;background-color:#76ABAE20;color:#76ABAE;border-radius:20px;font-size:13px;font-weight:600;border:1px solid #76ABAE40;">${data.service}</span>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px 0;">
          <h2 style="margin:0 0 12px;font-size:14px;color:#76ABAE;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Mensaje</h2>
          <div style="background-color:#31363F;border-radius:8px;padding:20px;color:#EEEEEE;font-size:14px;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</div>
        </td></tr>
        <tr><td style="padding:28px 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="border-top:1px solid #31363F;padding-top:20px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#b0b0b0;">Enviado desde el chatbot de <a href="https://guijosa.dev" style="color:#76ABAE;text-decoration:none;font-weight:600;">guijosa.dev</a></p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildConfirmationEmail(name: string) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#1a1a2e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a2e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#222831;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
        <tr><td style="background:linear-gradient(135deg,#222831 0%,#31363F 100%);padding:32px 40px;border-bottom:3px solid #76ABAE;">
          <h1 style="margin:0;font-size:22px;color:#76ABAE;font-weight:600;">Carlos Guijosa</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#b0b0b0;">Desarrollador Full Stack</p>
        </td></tr>
        <tr><td style="padding:32px 40px 0;">
          <h2 style="margin:0;font-size:20px;color:#EEEEEE;font-weight:600;">¡Hola ${name}!</h2>
          <p style="margin:12px 0 0;color:#b0b0b0;font-size:15px;line-height:1.6;">
            He recibido tu mensaje a través del chatbot. Gracias por tu interés, me pondré en contacto contigo en las próximas <strong style="color:#76ABAE;">24 horas</strong>.
          </p>
        </td></tr>
        <tr><td style="padding:28px 40px 0;" align="center">
          <a href="https://guijosa.dev" style="display:inline-block;padding:12px 32px;background-color:#76ABAE;color:#222831;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;">Visitar mi portafolio</a>
        </td></tr>
        <tr><td style="padding:28px 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="border-top:1px solid #31363F;padding-top:20px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#b0b0b0;">Este es un correo automático, no es necesario responder.</p>
              <p style="margin:0;font-size:12px;color:#b0b0b0;"><a href="https://guijosa.dev" style="color:#76ABAE;text-decoration:none;font-weight:600;">guijosa.dev</a> · Morelia, Michoacán</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST({ request }: APIContext): Promise<Response> {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Mensajes requeridos' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages.slice(-20)
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!groqResponse.ok) {
            console.error('GROQ Error:', await groqResponse.text());
            return new Response(
                JSON.stringify({ message: 'Error al procesar tu mensaje. Intenta de nuevo.', booked: false }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const data = await groqResponse.json();
        let aiMessage = data.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';

        // Check for booking confirmation marker
        const bookingRegex = /\|\|\|BOOKING\|\|\|(.*?)\|\|\|END\|\|\|/s;
        const match = aiMessage.match(bookingRegex);

        if (match) {
            try {
                const bookingData = JSON.parse(match[1]);
                const cleanMessage = aiMessage.replace(bookingRegex, '').trim();

                // Validate required fields
                if (bookingData.name && bookingData.email && bookingData.service && bookingData.message) {
                    const resend = new Resend(import.meta.env.RESEND_API_KEY);

                    // Email to Carlos
                    await resend.emails.send({
                        from: import.meta.env.RESEND_FROM_EMAIL,
                        to: import.meta.env.CONTACT_EMAIL,
                        replyTo: bookingData.email,
                        subject: `[Chatbot] Nuevo contacto: ${bookingData.name} - ${bookingData.service}`,
                        html: buildNotificationEmail(bookingData),
                    });

                    // Confirmation to client
                    await resend.emails.send({
                        from: import.meta.env.RESEND_FROM_EMAIL,
                        to: bookingData.email,
                        subject: '¡Mensaje recibido! — Carlos Guijosa',
                        html: buildConfirmationEmail(bookingData.name),
                    });

                    return new Response(
                        JSON.stringify({ message: cleanMessage, booked: true }),
                        { status: 200, headers: { 'Content-Type': 'application/json' } }
                    );
                }
            } catch (parseError) {
                console.error('Booking parse error:', parseError);
            }

            // If parsing/validation failed, return cleaned message
            const cleanMessage = aiMessage.replace(bookingRegex, '').trim();
            return new Response(
                JSON.stringify({ message: cleanMessage, booked: false }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: aiMessage, booked: false }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(
            JSON.stringify({ message: 'Error interno. Intenta de nuevo o usa el formulario de contacto.', booked: false }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
