import type { Metadata } from "next";

import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionLayout } from "@/components/layout/section-layout";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicite cotización de proyecto especial: maquinados de precisión y lotes bajo confidencialidad con Grupo GMI.",
};

export default function ContactoPage() {
  return (
    <SectionLayout
      eyebrow="Estamos para ayudarle"
      title="Solicitar cotización de proyecto especial"
      subtitle="Describa su pieza, material, cantidades y requisitos de confidencialidad. Un ingeniero revisará su solicitud; el envío es seguro vía Resend."
      contentClassName="max-w-7xl"
    >
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:gap-x-14">
        <div className="flex min-w-0 flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Formulario de proyecto
          </p>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm ring-1 ring-border/40 sm:p-8">
            <ContactForm />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ubicación
          </p>
          <ContactAside />
        </div>
      </div>
    </SectionLayout>
  );
}
