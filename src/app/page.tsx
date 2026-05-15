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

      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 border-y border-border py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex gap-4 md:gap-5">
              <Shield
                className="mt-0.5 size-6 shrink-0 text-primary md:size-7"
                aria-hidden
              />
              <div className="max-w-2xl space-y-2">
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
              className="w-full shrink-0 lg:w-auto"
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
