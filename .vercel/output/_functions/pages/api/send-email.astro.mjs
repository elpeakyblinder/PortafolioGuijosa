import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      number: formData.get("number"),
      service: formData.get("service"),
      message: formData.get("message")
    };
    if (!data.name || !data.email || !data.service || !data.message) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "devcharlying@gmail.com",
        pass: "chllomemdonwsjmb"
      }
    });
    const emailHtmlBody = `
            <p><strong>Nuevo mensaje de contacto: ${data.name} quiere contactarte.</strong></p>
            <hr>
            <p><strong>Datos del Interesado:</strong></p>
            <ul>
                <li><strong>Nombre:</strong> ${data.name}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Teléfono:</strong> ${data.number || "No proporcionado"}</li>
                <li><strong>Servicio de Interés:</strong> ${data.service}</li>
            </ul>
            <hr>
            <p><strong>Mensaje: del interesado</strong></p>
            <p>${data.message?.replace(/\n/g, "<br>")}</p>
            <hr>
        `;
    const mailOptions = {
      from: `"Portafolio Guijosa" <${"devcharlying@gmail.com"}>`,
      to: "devcharlying@gmail.com",
      replyTo: data.email,
      subject: `Nuevo Contacto: ${data.name} - ${data.service}`,
      html: emailHtmlBody
    };
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Mensaje enviado con éxito" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al enviar email:", error);
    return new Response(
      JSON.stringify({ error: "Error interno al enviar el mensaje." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
