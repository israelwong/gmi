"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Formulario de contacto"
    >
      <div className="grid gap-2">
        <label htmlFor="nombre" className="text-sm font-medium text-foreground">
          Nombre completo
        </label>
        <Input id="nombre" name="nombre" placeholder="Nombre y apellido" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Correo electrónico
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nombre@empresa.com"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono
          </label>
          <Input id="telefono" name="telefono" placeholder="+52 …" />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="empresa" className="text-sm font-medium text-foreground">
          Empresa
        </label>
        <Input id="empresa" name="empresa" placeholder="Razón social o proyecto" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
          Mensaje
        </label>
        <Textarea
          id="mensaje"
          name="mensaje"
          placeholder="Cuéntenos brevemente su requerimiento…"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Enviar solicitud
      </Button>
      <p className="text-xs text-muted-foreground">
        Al enviar acepta el tratamiento de sus datos conforme al aviso de
        privacidad (demo).
      </p>
    </form>
  );
}
