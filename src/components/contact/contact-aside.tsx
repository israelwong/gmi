import { Clock } from "lucide-react";
import Link from "next/link";

import { CompanyContactPhones } from "@/components/contact/company-contact-list";
import { companyInfo } from "@/lib/company-data";
import {
  googleMapsEmbedSrc,
  googleMapsExternalUrl,
} from "@/lib/maps/google-maps-embed";

export function ContactAside() {
  const c = companyInfo.contacto;
  const { lat, lon } = c.coordenadas;
  const mapSrc = googleMapsEmbedSrc(lat, lon);
  const mapExternal =
    c.enlaceGoogleMaps ?? googleMapsExternalUrl(lat, lon);

  return (
    <aside className="space-y-4 rounded-xl border border-border bg-muted/50 p-5 shadow-sm ring-1 ring-border/40 sm:p-6 md:sticky md:top-24">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-muted-foreground">
          {companyInfo.identidad.nombreOficial}
        </p>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Información de contacto
        </h2>
        <div className="flex gap-2 text-sm leading-snug text-muted-foreground">
          <Clock className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden />
          <p>
            <span className="font-medium text-foreground">
              Lun–vie · {c.horario}
            </span>
            {c.cerradoFinSemana ? (
              <span className="text-muted-foreground">
                {" "}
                · Cerrado sábados y domingos.
              </span>
            ) : null}
          </p>
        </div>
      </header>

      <CompanyContactPhones footerResumen compact dense />

      <div className="space-y-2">
        <div className="h-44 overflow-hidden rounded-md border border-border bg-background sm:h-52 md:h-[18.75rem]">
          <iframe
            title={`Ubicación — ${c.domicilio}, ${c.municipioRegion}`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
          />
        </div>
        <p className="text-center text-[11px] leading-snug text-muted-foreground">
          <Link
            href={mapExternal}
            className="text-primary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir en Google Maps
          </Link>
        </p>
      </div>
    </aside>
  );
}
