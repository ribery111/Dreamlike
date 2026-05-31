"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function ShaderHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const navLinks = [
    { href: "/auditorias", label: "Auditorías" },
    { href: "/clientes", label: "Clientes" },
    { href: "/chatbots", label: "Chatbots" },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
              result="tint" />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#FF5B14" />
            <stop offset="70%" stopColor="#FFBA08" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Fondo MeshGradient naranja/amarillo/rosa */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#FF5B14", "#FFBA08", "#1a0800", "#E8185C"]}
        speed={0.3}
        backgroundColor="#000000"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#000000", "#ffffff", "#FF5B14", "#FFBA08"]}
        speed={0.2}
        wireframe="true"
        backgroundColor="transparent"
      />
      {/* Overlay contraste */}
      <div className="absolute inset-0 bg-black/50" />

      {/* NAVBAR */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-poppins)] text-xl font-bold flex items-center">
          <span className="text-[#FF5B14]">Pymes</span>
          <span className="text-white">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-xs font-light px-3 py-2 rounded-full transition-all duration-200 ${
                pathname === l.href ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center" style={{ filter: "url(#gooey-filter)" }}>
          <div className="relative flex items-center group">
            <span className="absolute right-0 px-2.5 py-2 rounded-full bg-[#FF5B14] text-white text-xs h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-20 z-0 transition-all duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
            <Link href="/auditorias#formulario"
              className="px-6 py-2 rounded-full bg-white text-black font-medium text-xs h-8 flex items-center z-10 hover:bg-white/90 transition-colors">
              Solicitar auditoría
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/auditorias#formulario"
            className="bg-[#FF5B14] text-white text-xs font-semibold px-3 py-2 rounded-full">
            Auditoría gratis
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1 min-h-[44px] min-w-[44px] flex items-center justify-center">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="relative z-20 md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 pb-4 pt-2">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="block py-3 text-sm font-medium text-white/70 border-b border-white/10 last:border-0">
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* HERO — bottom left */}
      <main className="absolute bottom-8 left-6 sm:left-8 z-20 max-w-2xl">
        <div className="text-left">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10"
            style={{ filter: "url(#glass-effect)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent rounded-full" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              ✦ Inteligencia. Datos. Resultados.
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none tracking-tight font-[family-name:var(--font-poppins)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-light text-3xl md:text-4xl lg:text-5xl mb-2 tracking-wider"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #FF5B14 40%, #FFBA08 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#text-glow)",
              }}
            >
              Más clientes.
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">Con datos</span>
            <span className="block font-light text-white/80 italic">reales.</span>
          </motion.h1>

          <motion.p
            className="text-base font-light text-white/65 mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él.{" "}
            <strong className="text-white/85 font-medium">En menos de 24 horas.</strong>
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link href="/auditorias"
              className="px-8 py-3.5 rounded-full bg-transparent border border-white/30 text-white font-medium text-sm hover:bg-white/10 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-sm">
              Ver cómo funciona
            </Link>
            <Link href="/auditorias#formulario"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5B14] to-[#FFBA08] text-white font-semibold text-sm hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-orange-500/25">
              Quiero mi auditoría gratis
            </Link>
          </motion.div>
        </div>
      </main>

      {/* PulsingBorder — bottom right */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PulsingBorder
            colors={["#FF5B14", "#FFBA08", "#E8185C", "#ffffff", "#FF5B14"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotsPerColor={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle-path" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text fontSize="8" fill="rgba(255,255,255,0.7)" fontFamily="Inter, sans-serif">
              <textPath href="#circle-path" startOffset="0%">
                PymesAI • Datos Reales • PymesAI • 24h •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  )
}
