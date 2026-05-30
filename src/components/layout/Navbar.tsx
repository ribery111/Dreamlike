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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(4,7,28,0.75)] backdrop-blur-xl border-b border-white/10 shadow-[0_1px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center font-[family-name:var(--font-poppins)] text-xl" aria-label="PymesAI">
            <span className="text-[#2563EB] font-bold">Pymes</span>
            <span className="text-white font-bold">AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  pathname === l.href ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Link
              href="/auditorias#formulario"
              className="bg-[#2563EB] hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Solicitar auditoría
            </Link>
          </div>

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

      {open && (
        <div className="md:hidden bg-[rgba(4,7,28,0.95)] backdrop-blur-xl border-t border-white/10 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Menú móvil">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "py-3 text-sm font-medium border-b border-white/10 last:border-0",
                  pathname === l.href ? "text-white" : "text-white/60"
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
