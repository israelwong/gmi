import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildClientConfirmationEmail,
  buildInternalLeadEmail,
} from "@/lib/email/contact-templates";
import { getSiteBaseUrl } from "@/lib/email/site-base-url";
import { contactFormSchema } from "@/lib/validations/contact";

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
  const internal = buildInternalLeadEmail(data);
  const client = buildClientConfirmationEmail(data, getSiteBaseUrl());

  const internalSend = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: internal.subject,
    html: internal.html,
  });

  if (internalSend.error) {
    return NextResponse.json(
      {
        error:
          internalSend.error.message ?? "No se pudo enviar el correo interno",
      },
      { status: 502 },
    );
  }

  const confirmSend = await resend.emails.send({
    from,
    to: [data.email],
    replyTo: to,
    subject: client.subject,
    html: client.html,
  });

  if (confirmSend.error) {
    console.error(
      "[api/send] Correo interno OK; confirmación al cliente falló:",
      confirmSend.error.message,
    );
  }

  return NextResponse.json({
    ok: true,
    clientConfirmationSent: !confirmSend.error,
  });
}
