import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grupo GMI — Ingeniería y soluciones industriales",
    template: "%s | Grupo GMI",
  },
  description:
    "Grupo GMI: ingeniería, sistemas modulares, almacenamiento y logística industrial con ADN mexicano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
