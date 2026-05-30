import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400" data-acf-field="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-[family-name:var(--font-poppins)] text-lg font-bold mb-1">
              <span className="text-[#2563EB]">Pymes</span>
              <span className="text-white">AI</span>
            </div>
            <p className="text-sm text-slate-400" data-acf-field="footer_tagline">
              Inteligencia. Datos. Resultados.
            </p>
          </div>

          <nav aria-label="Links legales">
            <ul className="flex flex-wrap justify-center gap-4 text-xs">
              <li>
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="hover:text-white transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} PymesAI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
