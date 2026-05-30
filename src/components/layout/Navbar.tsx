"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/auditorias", label: "Auditorías" },
  { href: "/clientes", label: "Clientes" },
  { href: "/chatbots", label: "Chatbots" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md shadow-lg"
          : "bg-[#0F172A]"
      )}
      data-acf-field="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-poppins)] font-700 text-xl text-white"
            aria-label="PymesAI - Inicio"
          >
            <span className="text-[#2563EB] font-bold">Pymes</span>
            <span className="text-white font-bold">AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  pathname === l.href
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auditorias#formulario"
              className="bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-white"
              data-acf-field="nav_cta"
            >
              Solicitar auditoría
            </Link>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/auditorias#formulario"
              className="bg-[#2563EB] text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Auditoría gratis
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="text-white p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0F172A] border-t border-slate-800 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Menú móvil">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "py-3 text-sm font-medium border-b border-slate-800 last:border-0",
                  pathname === l.href ? "text-white" : "text-slate-300"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
