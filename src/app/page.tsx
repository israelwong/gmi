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

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm">
              <Shield className="h-6 w-6" aria-hidden />
            </div>
            <div className="max-w-xl space-y-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {companyInfo.confidencialidad.titulo}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {companyInfo.confidencialidad.texto}
              </p>
            </div>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Solicitar cotización de proyecto especial</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
