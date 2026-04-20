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
      subtitle="Complete el formulario y un especialista se pondrá en contacto. Por ahora es solo interfaz; en producción se conectará a su CRM o correo."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactForm />
        <ContactAside />
      </div>
    </SectionLayout>
  );
}
