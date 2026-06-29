import { CapabilitiesBento } from "@/components/home/capabilities-bento";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { Hero } from "@/components/home/hero";
import { HomeGallery } from "@/components/home/home-gallery";
import { InstitutionalVideo } from "@/components/home/institutional-video";
import { companyInfo } from "@/lib/company-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsMarquee clientes={companyInfo.clientes} />
      <InstitutionalVideo />
      <HomeGallery />
      <CapabilitiesBento capacidades={companyInfo.capacidades} />
    </>
  );
}
