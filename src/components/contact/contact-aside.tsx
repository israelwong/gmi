import { Mail, MapPin, Phone, Share2 } from "lucide-react";

export function ContactAside() {
  return (
    <aside className="space-y-8 rounded-xl border border-border bg-muted/50 p-6 shadow-sm ring-1 ring-border/40 sm:p-8 md:sticky md:top-24">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Oficina central
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Atención de lunes a viernes, 9:00 a 18:00 (hora del centro).
        </p>
      </div>
      <ul className="space-y-4 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <span>
            Av. Industrial 1000, Col. Zona Industrial
            <br />
            Ciudad de México, CDMX — C.P. 00000
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <a href="tel:+525555555555" className="hover:text-primary">
            +52 (55) 5555 5555
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <a href="mailto:contacto@grupogmi.mx" className="hover:text-primary">
            contacto@grupogmi.mx
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Share2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            LinkedIn — Grupo GMI
          </a>
        </li>
      </ul>
      <div className="aspect-video overflow-hidden rounded-md border border-border bg-background">
        <iframe
          title="Mapa de ubicación — demo"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-99.195%2C19.395%2C-99.115%2C19.455&amp;layer=mapnik"
        />
      </div>
    </aside>
  );
}
