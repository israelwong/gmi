"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [feedback, setFeedback] = useState<{
    type: "ok" | "err";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      mensaje: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setFeedback(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: unknown = await res.json().catch(() => null);
      const message =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "No se pudo enviar. Intente de nuevo.";

      if (!res.ok) {
        setFeedback({ type: "err", message });
        return;
      }

      reset();
      setFeedback({
        type: "ok",
        message: "Solicitud enviada. Nos pondremos en contacto pronto.",
      });
    } catch {
      setFeedback({
        type: "err",
        message: "Error de red. Verifique su conexión.",
      });
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Formulario de contacto"
    >
      {feedback && (
        <div
          role="status"
          className={cn(
            "rounded-md border px-4 py-3 text-sm",
            feedback.type === "ok"
              ? "border-primary/30 bg-primary/5 text-foreground"
              : "border-red-200 bg-red-50 text-red-900",
          )}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid gap-2">
        <label htmlFor="nombre" className="text-sm font-medium text-foreground">
          Nombre completo
        </label>
        <Input
          id="nombre"
          autoComplete="name"
          aria-invalid={errors.nombre ? "true" : "false"}
          {...register("nombre")}
        />
        {errors.nombre && (
          <p className="text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Correo electrónico
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono
          </label>
          <Input
            id="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="Opcional"
            aria-invalid={errors.telefono ? "true" : "false"}
            {...register("telefono")}
          />
          {errors.telefono && (
            <p className="text-sm text-red-600">{errors.telefono.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="empresa" className="text-sm font-medium text-foreground">
          Empresa
        </label>
        <Input
          id="empresa"
          autoComplete="organization"
          aria-invalid={errors.empresa ? "true" : "false"}
          {...register("empresa")}
        />
        {errors.empresa && (
          <p className="text-sm text-red-600">{errors.empresa.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
          Mensaje
        </label>
        <Textarea
          id="mensaje"
          rows={5}
          aria-invalid={errors.mensaje ? "true" : "false"}
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p className="text-sm text-red-600">{errors.mensaje.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Al enviar acepta el tratamiento de sus datos conforme al aviso de
        privacidad.
      </p>
    </form>
  );
}
