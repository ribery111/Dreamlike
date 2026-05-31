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
    <>
      {/* SVG filtros para efecto gooey */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="nav-gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center font-[family-name:var(--font-poppins)] text-xl" aria-label="PymesAI">
              <span className="text-[#FF5B14] font-bold">Pymes</span>
              <span className="text-white font-bold">AI</span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-xs font-light px-3 py-2 rounded-full transition-all duration-200",
                    pathname === l.href
                      ? "text-white bg-white/15"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* CTA gooey — desktop */}
            <div className="hidden md:flex items-center" style={{ filter: "url(#nav-gooey)" }}>
              <div className="relative flex items-center group">
                <span className="absolute right-0 w-8 h-8 rounded-full bg-[#FF5B14] flex items-center justify-center -translate-x-10 group-hover:-translate-x-[5.5rem] z-0 transition-all duration-300">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
                <Link
                  href="/auditorias#formulario"
                  className="px-6 py-2 rounded-full bg-white text-black font-medium text-xs h-8 flex items-center z-10 hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  Solicitar auditoría
                </Link>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/auditorias#formulario"
                className="bg-[#FF5B14] text-white text-xs font-semibold px-3 py-2 rounded-full"
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
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 pb-4 pt-2">
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
    </>
  );
}
