import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reforma Teziupark | Firmas Ciudadanas · Teziutlán, Puebla",
  description:
    "Exigimos la reforma inmediata al Reglamento de Estacionómetros Teziupark para incluir políticas claras, justas e incluyentes para motociclistas y trabajadores de plataformas de entrega en Teziutlán.",
  icons: {
    icon: "/teziuactua-favicon.png",
    apple: "/teziuactua-favicon.png",
  },
  keywords: [
    "Teziupark",
    "motociclistas",
    "repartidores",
    "Teziutlán",
    "Puebla",
    "petición ciudadana",
    "reforma reglamento",
    "estacionómetros",
  ],
  openGraph: {
    title: "Reforma Teziupark | Petición Ciudadana · Teziutlán",
    description:
      "Súmate a la exigencia ciudadana para reformar el Reglamento de Estacionómetros y proteger a motociclistas y repartidores.",
    type: "website",
    locale: "es_MX",
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
      className={`${inter.variable} ${barlow.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#080808] text-white antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
