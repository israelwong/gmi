import type { Metadata } from "next";

import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionLayout } from "@/components/layout/section-layout";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacte a Grupo GMI para cotizaciones, alianzas y soporte en ingeniería industrial.",
};

export default function ContactoPage() {
  return (
    <SectionLayout
      eyebrow="Estamos para ayudarle"
      title="Contacto"
      subtitle="Complete el formulario y un especialista se pondrá en contacto. Los datos se envían por correo a la empresa mediante un servicio seguro (Resend)."
      contentClassName="max-w-7xl"
    >
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:gap-x-14">
        <div className="flex min-w-0 flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Solicitud en línea
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
