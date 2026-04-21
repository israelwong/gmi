import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactFormSchema } from "@/lib/validations/contact";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo JSON inválido" },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validación fallida",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from =
    process.env.RESEND_FROM ?? "Grupo GMI <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar RESEND_API_KEY en el servidor" },
      { status: 500 },
    );
  }

  if (!to) {
    return NextResponse.json(
      { error: "Falta configurar LEADS_TO_EMAIL en el servidor" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const telefonoLine = data.telefono
    ? `<p><strong>Teléfono:</strong> ${escapeHtml(data.telefono)}</p>`
    : "";

  const html = `
    <h1>Nuevo lead — Grupo GMI</h1>
    <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    ${telefonoLine}
    <p><strong>Empresa / proyecto:</strong> ${escapeHtml(data.empresa)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(data.mensaje).replace(/\n/g, "<br/>")}</p>
    <hr />
    <p style="font-size:12px;color:#64748b">Enviado desde el formulario web.</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[Lead] ${data.nombre} — ${data.empresa}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "No se pudo enviar el correo" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
