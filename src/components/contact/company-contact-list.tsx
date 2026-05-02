import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { companyInfo } from "@/lib/company-data";

type CompanyContactListProps = {
  /** Íconos y tipografía más densos para el footer. */
  compact?: boolean;
  /**
   * En el pie solo se muestra el teléfono de oficina; WhatsApp y líneas por
   * persona siguen disponibles en /contacto.
   */
  footerResumen?: boolean;
};

export function CompanyContactPhones({
  compact,
  footerResumen,
}: CompanyContactListProps) {
  const icon = compact ? "h-4 w-4" : "h-5 w-5";

  const telefonos =
    footerResumen === true
      ? companyInfo.contacto.telefonos.filter((t) => t.etiqueta === "Oficina")
      : companyInfo.contacto.telefonos;

  return (
    <ul
      className={
        compact
          ? "space-y-3 text-sm text-muted-foreground"
          : "space-y-4 text-sm text-muted-foreground"
      }
    >
      <li className="flex gap-2">
        <MapPin
          className={`mt-0.5 shrink-0 text-accent ${icon}`}
          aria-hidden
        />
        <span>
          <span className="block font-medium text-foreground">
            {companyInfo.contacto.domicilio}
          </span>
          <span className="block">{companyInfo.contacto.municipioRegion}</span>
        </span>
      </li>
      {telefonos.map((t) => {
        const isWa = t.href.includes("wa.me");
        return (
          <li key={`${t.etiqueta}-${t.href}`} className="flex items-start gap-2">
            <Phone className={`mt-0.5 shrink-0 text-accent ${icon}`} aria-hidden />
            <span>
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                {t.etiqueta}
              </span>
              <a
                href={t.href}
                className="text-primary underline-offset-2 hover:underline hover:opacity-90"
                {...(isWa
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {t.numeroDisplay}
              </a>
            </span>
          </li>
        );
      })}
      <li className="flex gap-2">
        <Globe className={`mt-0.5 shrink-0 text-accent ${icon}`} aria-hidden />
        <Link
          href={companyInfo.contacto.sitioWeb.href}
          className="text-primary underline-offset-2 hover:underline hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          {companyInfo.contacto.sitioWeb.etiqueta}
        </Link>
      </li>
    </ul>
  );
}

export function CompanyContactEmails({ compact }: CompanyContactListProps) {
  const icon = compact ? "h-4 w-4" : "h-5 w-5";
  const gapClass = compact ? "flex items-center gap-2" : "flex items-start gap-3";

  return (
    <ul
      className={compact ? "mt-4 space-y-2 text-sm" : "mt-6 space-y-3 text-sm"}
    >
      {companyInfo.contacto.correos.map((c) => (
        <li key={c.direccion} className={gapClass}>
          <Mail className={`shrink-0 text-accent ${icon}`} aria-hidden />
          <span>
            <span className="block text-muted-foreground">{c.titular}</span>
            <a
              href={`mailto:${c.direccion}`}
              className="font-medium text-primary underline-offset-2 hover:underline hover:opacity-90"
            >
              {c.direccion}
            </a>
          </span>
        </li>
      ))}
    </ul>
  );
}
