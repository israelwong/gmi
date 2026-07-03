import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { ThemeProvider } from "@/components/layout/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ISOTIPO_URL =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/logos/isotipo_gmi.svg";

export const metadata: Metadata = {
  title: {
    default: "Grupo GMI — Ingeniería y soluciones industriales",
    template: "%s | Grupo GMI",
  },
  description:
    "Grupo GMI: maquinados industriales de precisión, parque HAAS y Doosan, y proyectos bajo confidencialidad desde 1985.",
  icons: {
    icon: [{ url: ISOTIPO_URL, type: "image/svg+xml" }],
    shortcut: ISOTIPO_URL,
    apple: ISOTIPO_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
