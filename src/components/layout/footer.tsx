import Link from "next/link";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";

import { NAV_ITEMS } from "./nav-items";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Grupo GMI
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Soluciones de ingeniería, sistemas modulares y logística industrial
              con estándares de calidad y un ADN mexicano enfocado en resultados.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Enlaces rápidos</p>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">México</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  Av. Industrial 1000, Col. Zona Industrial
                  <br />
                  Ciudad de México, CDMX — C.P. 00000
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a href="tel:+525555555555" className="hover:text-primary">
                  +52 (55) 5555 5555
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a href="mailto:contacto@grupogmi.mx" className="hover:text-primary">
                  contacto@grupogmi.mx
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Share2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Grupo GMI. Todos los derechos reservados.</p>
          <p>
            <Link href="/contacto" className="hover:text-primary">
              Aviso de privacidad
            </Link>
            <span className="mx-2 text-border">|</span>
            <Link href="/contacto" className="hover:text-primary">
              Términos de uso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
