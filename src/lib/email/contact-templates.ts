import { companyInfo } from "@/lib/company-data";
import type { ContactFormValues } from "@/lib/validations/contact";

import { escapeHtml } from "./escape-html";

const brandBlue = "#004a99";
const muted = "#64748b";

function formatPhonesForEmail() {
  return companyInfo.contacto.telefonos
    .map((t) => `${escapeHtml(t.etiqueta)}: ${escapeHtml(t.numeroDisplay)}`)
    .join(" · ");
}

/** Notificación al equipo (HTML). */
export function buildInternalLeadEmail(data: ContactFormValues) {
  const telefonoLine = data.telefono
    ? `<p><strong>Teléfono:</strong> ${escapeHtml(data.telefono)}</p>`
    : "";

  const html = `
    <h1 style="margin:0 0 16px;font-size:20px;color:${brandBlue};">Cotización de proyecto especial — Grupo GMI</h1>
    <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    ${telefonoLine}
    <p><strong>Empresa / proyecto:</strong> ${escapeHtml(data.empresa)}</p>
    <p><strong>Alcance del proyecto:</strong></p>
    <p style="margin:12px 0;line-height:1.5;">${escapeHtml(data.mensaje).replace(/\n/g, "<br/>")}</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="font-size:12px;color:${muted}">Enviado desde el formulario web.</p>
  `;

  return {
    subject: `[Cotización proyecto] ${data.nombre} — ${data.empresa}`,
    html,
  };
}

/** Confirmación al visitante (HTML). */
export function buildClientConfirmationEmail(
  data: ContactFormValues,
  siteBaseUrl: string,
) {
  const id = companyInfo.identidad;
  const legalName = id.nombreOficial;
  const sigla = id.sigla ?? "GMI";
  const contactoUrl = siteBaseUrl ? `${siteBaseUrl}/contacto` : "/contacto";
  const contactoLinks = siteBaseUrl
    ? `<a href="${escapeHtml(contactoUrl)}" style="color:${brandBlue};">página de contacto</a>`
    : "página de contacto del sitio";

  const resumen = escapeHtml(data.mensaje).replace(/\n/g, "<br/>");

  const html = `
    <div style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:32px 16px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;border-collapse:collapse;">
              <tr>
                <td style="padding:28px 28px 8px;background:linear-gradient(180deg,#004a9914 0%,#ffffff 100%);">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${brandBlue};">${escapeHtml(sigla)}</p>
                  <h1 style="margin:0;font-size:20px;line-height:1.35;color:#0f172a;">Recibimos su solicitud</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 28px 24px;color:#334155;font-size:15px;line-height:1.6;">
                  <p style="margin:0 0 16px;">Estimado/a <strong>${escapeHtml(data.nombre)}</strong>,</p>
                  <p style="margin:0 0 16px;">
                    Confirmamos que hemos recibido su solicitud de cotización dirigida a
                    <strong>${escapeHtml(legalName)}</strong>. Un integrante del equipo la revisará y, de ser necesario,
                    se pondrá en contacto con usted usando los datos que nos proporcionó.
                  </p>
                  <div style="margin:20px 0;padding:16px;background:#f1f5f9;border-radius:8px;font-size:14px;line-height:1.55;color:#475569;">
                    <p style="margin:0 0 8px;"><strong>Empresa o proyecto:</strong> ${escapeHtml(data.empresa)}</p>
                    <p style="margin:0;"><strong>Mensaje enviado:</strong></p>
                    <div style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;">${resumen}</div>
                  </div>
                  <p style="margin:0 0 12px;color:${muted};font-size:13px;line-height:1.5;">
                    Este mensaje es una confirmación automática. Si no envió ninguna solicitud, puede ignorar este correo.
                  </p>
                  <p style="margin:0;font-size:13px;color:${muted};line-height:1.5;">
                    Consulte nuestro aviso de privacidad y términos en la ${contactoLinks}.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;background:#fafbfc;font-size:12px;color:${muted};line-height:1.5;">
                  <p style="margin:0 0 6px;"><strong style="color:#0f172a;">${escapeHtml(sigla)}</strong> · ${escapeHtml(legalName)}</p>
                  <p style="margin:0;">${formatPhonesForEmail()}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  return {
    subject: `${sigla} — Hemos recibido su solicitud de cotización`,
    html,
  };
}
