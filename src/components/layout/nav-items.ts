/** Navegación en barra y drawer; Contacto va por el CTA del header. */
export const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/tecnologia", label: "Capacidades y Tecnología" },
] as const;

/** Enlaces rápidos en pie (incluye Contacto). */
export const FOOTER_NAV_ITEMS = [
  ...NAV_ITEMS,
  { href: "/contacto", label: "Contacto" },
] as const;
