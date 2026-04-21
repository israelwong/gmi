import { z } from "zod";

export const contactFormSchema = z.object({
  nombre: z.string().trim().min(2, "Ingrese al menos 2 caracteres"),
  email: z.string().trim().email("Correo electrónico no válido"),
  telefono: z.union([
    z.literal(""),
    z.string().trim().min(8, "Teléfono demasiado corto"),
  ]),
  empresa: z.string().trim().min(1, "Indique empresa o proyecto"),
  mensaje: z
    .string()
    .trim()
    .min(10, "Describa su requerimiento (mínimo 10 caracteres)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
