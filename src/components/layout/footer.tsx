import Link from "next/link";

import { CompanyContactPhones } from "@/components/contact/company-contact-list";
import { companyInfo } from "@/lib/company-data";

import { FOOTER_NAV_ITEMS } from "./nav-items";

export function Footer() {
  const year = new Date().getFullYear();
  const id = companyInfo.identidad;

  return (
    <footer className="mt-auto border-t-2 border-t-primary/25 border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {id.sigla ?? "GMI"}
            </p>
            <p className="text-sm font-bold text-foreground">
              {id.nombreOficial}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {companyInfo.manufactura.especialidad} Fabricación técnica con
              enfoque en sectores como {companyInfo.manufactura.sectoresExperiencia}
              y confidencialidad cuando el proyecto lo requiere.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Enlaces rápidos
            </p>
            <ul className="mt-4 space-y-2">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary/90 underline-offset-2 transition-opacity hover:text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Información de contacto
            </p>
            <CompanyContactPhones compact footerResumen />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Lun–vie {companyInfo.contacto.horario}
              {companyInfo.contacto.cerradoFinSemana
                ? " · Cerrado sábados y domingos."
                : null}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {id.sigla ?? "GMI"} · {id.nombreOficial}</p>
          <p>
            <Link
              href="/contacto"
              className="text-primary/90 underline-offset-2 hover:text-primary hover:underline"
            >
              Aviso de privacidad
            </Link>
            <span className="mx-2 text-border">|</span>
            <Link
              href="/contacto"
              className="text-primary/90 underline-offset-2 hover:text-primary hover:underline"
            >
              Términos de uso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
