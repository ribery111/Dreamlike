import Link from "next/link";

export function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-[family-name:var(--font-poppins)] text-lg font-bold mb-1">
              <span className="text-[#2563EB]">Pymes</span>
              <span className="text-white">AI</span>
            </div>
            <p className="text-sm text-white/40">Inteligencia. Datos. Resultados.</p>
          </div>
          <nav aria-label="Links legales">
            <ul className="flex flex-wrap justify-center gap-4 text-xs">
              {["Política de privacidad", "Aviso legal", "Cookies"].map((t) => (
                <li key={t}>
                  <Link href="#" className="text-white/40 hover:text-white transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-white/20">
          © {new Date().getFullYear()} PymesAI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
