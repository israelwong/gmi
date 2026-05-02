import { Clock } from "lucide-react";

import {
  CompanyContactEmails,
  CompanyContactPhones,
} from "@/components/contact/company-contact-list";
import { companyInfo } from "@/lib/company-data";

export function ContactAside() {
  const c = companyInfo.contacto;

  return (
    <aside className="space-y-8 rounded-xl border border-border bg-muted/50 p-6 shadow-sm ring-1 ring-border/40 sm:p-8 md:sticky md:top-24">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {companyInfo.identidad.nombreOficial}
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          Información de contacto
        </h2>
        <div className="mt-4 flex gap-3 text-sm text-muted-foreground">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="leading-relaxed">
              <span className="font-medium text-foreground">
                Lun a vie · {c.horario}
              </span>
            </p>
            {c.cerradoFinSemana ? (
              <p className="mt-2 text-muted-foreground">
                Cerrado sábados y domingos.
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <CompanyContactPhones />
        <CompanyContactEmails />
      </div>
      <div className="aspect-video overflow-hidden rounded-md border border-border bg-background">
        <iframe
          title={`Ubicación — ${c.municipioRegion}`}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-99.12%2C19.56%2C-98.98%2C19.64&amp;layer=mapnik"
        />
      </div>
    </aside>
  );
}
