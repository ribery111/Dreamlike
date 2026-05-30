import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalBackground } from "@/components/GlobalBackground";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PymesAI — Inteligencia. Datos. Resultados.",
  description:
    "Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él. En menos de 24 horas.",
  openGraph: {
    title: "PymesAI — Más clientes para tu negocio. Con datos reales.",
    description:
      "Auditorías comerciales, listas de clientes potenciales y chatbots para pymes. Entrega en menos de 24h.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        <GlobalBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
