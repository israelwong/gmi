import Link from "next/link";
import { Shield } from "lucide-react";

import { CapabilitiesBento } from "@/components/home/capabilities-bento";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { Hero } from "@/components/home/hero";
import { HomeGallery } from "@/components/home/home-gallery";
import { InstitutionalVideo } from "@/components/home/institutional-video";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsMarquee clientes={companyInfo.clientes} />
      <InstitutionalVideo />
      <HomeGallery />
      <CapabilitiesBento capacidades={companyInfo.capacidades} />

      <section className="border-t border-border bg-gradient-to-b from-muted/45 via-muted/20 to-background py-16 dark:from-muted/12 dark:via-background dark:to-background sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-md ring-1 ring-primary/10 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/80 text-primary shadow-sm">
                <Shield className="h-6 w-6" aria-hidden />
              </div>
              <div className="max-w-xl space-y-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  {companyInfo.confidencialidad.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {companyInfo.confidencialidad.texto}
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 w-full shrink-0 lg:mt-0 lg:w-auto"
            >
              <Link href="/contacto">
                Solicitar cotización de proyecto especial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
