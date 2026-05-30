# PymesAI — Documento de Handoff

> Estado del proyecto, arquitectura y guía para retomar el trabajo.
> Última actualización: 2026-05-30

---

## 1. Resumen del proyecto

Web comercial de **PymesAI** (4 páginas) más un **tema WordPress** equivalente para exportar a Hostinger.

- **App de referencia:** Next.js 16 (App Router, `src/`) en la raíz del repo.
- **Export para cliente:** tema WordPress en `wordpress-theme/pymesai/` (PHP + ACF, sin build, hosting compartido).
- **Idioma:** todo el contenido y la comunicación en español.

---

## 2. Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`, sin `tailwind.config.js`) |
| Componentes | shadcn/ui manual (sin CLI) en `src/components/ui/` |
| Animaciones | framer-motion |
| Iconos | lucide-react |
| Fuentes | Poppins 600-700 (títulos) + Inter 400-500 (cuerpo) vía `next/font` |
| Export | WordPress (PHP + ACF PRO) |

### Comandos
```bash
npm run dev      # localhost:3000
npm run build    # build producción
npm run lint     # lint
```

---

## 3. Estado actual (git)

- **Rama de trabajo:** `claude/friendly-albattani-3XQvr` (repo `ribery111/Dreamlike`).
- **Último commit:** `c245bf8` — Add PymesAI WordPress theme for Hostinger export.
- **Commit de referencia visual estable:** `f9809be` — TextEffect + GlowingShadow, **sin** motion-footer.

> El motion-footer GSAP (commits `badbb8a`, `f64a13f`) fue **rechazado por el usuario** y revertido. No reintroducir salvo petición explícita. La dependencia `gsap` quedó instalada pero sin uso activo.

---

## 4. Estructura de archivos

### Next.js
```
src/
  app/
    globals.css            variables marca, utilidades glass, animaciones, tokens shadcn
    layout.tsx             fuentes, GlobalBackground, Navbar, Footer
    page.tsx               HOME
    auditorias/page.tsx    AUDITORÍAS (+ QuizOverlay)
    clientes/page.tsx      CLIENTES
    chatbots/page.tsx      CHATBOTS
  components/
    GlobalBackground.tsx   fondo animado fixed + mouse-tracking
    AuditForm.tsx          formulario 2 pasos con barra de progreso
    QuizOverlay.tsx        overlay quiz (2s delay, scroll a #formulario)
    layout/
      Navbar.tsx           sticky, transparente → glass al hacer scroll
      Footer.tsx           glass-dark, logo, links legales
    ui/
      glowing-shadow.tsx   glow cromático rotatorio (CSS @property)
      text-effect.tsx      animación blur palabra a palabra (framer-motion)
      background-gradient-animation.tsx
  lib/
    utils.ts               cn()
```

### WordPress (`wordpress-theme/pymesai/`)
```
style.css                  cabecera del tema
functions.php              setup, encolado, helper pymesai_the_field(), CPT Lead + email, auto-creación páginas
header.php / footer.php    navbar + fondo animado / footer
front-page.php             HOME
page-auditorias.php        AUDITORÍAS (quiz overlay PHP)
page-clientes.php          CLIENTES (tabla ejemplo)
page-chatbots.php          CHATBOTS
page.php / index.php       fallback (páginas legales)
inc/acf-fields.php         4 grupos de campos ACF
template-parts/            audit-form, lead-form, chatbot-form, stats
assets/css/main.css        design system completo portado
assets/js/main.js          fondo, navbar, forms, quiz, text-effect, reveal (vanilla JS)
INSTALACION-HOSTINGER.md   guía de instalación
```
Existe `wordpress-theme/pymesai.zip` listo para subir.

---

## 5. Sistema de diseño

- **Colores marca:** azul `#2563EB`, azul oscuro `#0F172A`, gris `#64748B`, fondo navy `#04071c`, azul claro `#60A5FA`.
- **Glassmorphism:** clases utilitarias `glass-card`, `glass-section`, `glass-dark`, `input-glass` (en `globals.css` y `main.css`).
- **Fondo:** `GlobalBackground` fixed a viewport completo con blobs de gradiente animados y capa que sigue el ratón.
- **GlowingShadow:** glow cromático en las tarjetas de stats (prueba social).
- **TextEffect:** blur palabra a palabra en el H1 de las 4 páginas.

---

## 6. Mapa de contenido

Contenido completo de las 4 páginas (hero, problema, soluciones, stats, formularios, quiz, objeciones) está:
- **Hardcodeado** como fallback en cada `page.tsx` (Next.js).
- **Editable vía ACF** en cada plantilla PHP (WordPress), con los mismos textos como valor por defecto.

Inventario detallado del copy: ver respuesta previa del asistente / contenido de los archivos de página. Resumen por página:
- **HOME:** eyebrow + H1 "Más clientes para tu negocio. Con datos reales." + 3 problemas + 3 soluciones + stats (+10 años / <24h / 100%) + CTA AuditForm.
- **AUDITORÍAS:** H1 "Descubre dónde están tus próximos clientes." + para quién (4) + sectores + entregables (4) + método IDEA (4 pasos) + objeciones (3) + AuditForm + QuizOverlay.
- **CLIENTES:** H1 "Tu próximo cliente ya existe." + tabla ejemplo (4 filas) + usos por sector (4) + diferenciador (3) + LeadForm (sector/ciudad/email).
- **CHATBOTS:** H1 "Responde a tus clientes 24/7 sin estar tú." + problema (4) + funciones (5) + casos (4) + cómo funciona (3 pasos) + 67% stat + ChatbotForm (nombre/tipo_negocio/teléfono).

---

## 7. Captura de leads

- **WordPress:** formularios → AJAX (`wp_ajax_pymes_lead` + `nopriv`) → guarda en CPT `lead` + email al admin.
  - Historial: WordPress → **Leads**.
  - Email: requiere plugin SMTP (ej. *WP Mail SMTP*) en Hostinger para entrega fiable.
- **Next.js:** formularios validan client-side y muestran estado de éxito (sin backend conectado todavía).

---

## 8. Reglas UX obligatorias (CLAUDE.md)

- Máximo 1 CTA principal por pantalla.
- Hero comprensible en <6 segundos.
- Formularios con barra de progreso visible.
- PROHIBIDO: sliders automáticos, popups invasivos.
- Mobile first siempre.
- Sin texto de relleno.
- Componentes UI nuevos → siempre en `src/components/ui/` y usar `cn()` de `@/lib/utils`.

> **Nota Next.js 16:** tiene breaking changes respecto a versiones anteriores. Consultar `node_modules/next/dist/docs/` antes de escribir código nuevo. Atender avisos de deprecación.

---

## 9. Tareas pendientes

- [ ] **Auditoría responsive móvil** de la app Next.js (solicitada por el usuario, no completada). El tema WordPress sí está probado 375px→1440px.
- [ ] Conectar backend real de captura de leads en la app Next.js (actualmente solo estado de éxito client-side).
- [ ] Páginas legales (privacidad, aviso legal) — plantillas fallback existen en WordPress, falta redactar contenido.

---

## 10. Instalación en Hostinger (resumen)

1. Subir `pymesai.zip` → Apariencia → Temas → Añadir nuevo → Subir → Activar (crea las 4 páginas automáticamente).
2. Instalar **Advanced Custom Fields PRO** (los repeaters necesitan PRO).
3. Editar textos en Páginas → Inicio / Auditorías / Clientes / Chatbots.
4. Menús en Apariencia → Menús (ubicaciones: "Menú principal" y "Menú legal").
5. Instalar plugin SMTP para emails de leads.

Detalle completo: `wordpress-theme/INSTALACION-HOSTINGER.md`.

---

## 11. Notas / decisiones tomadas

- WordPress se eligió en formato **PHP + ACF** (no headless) porque el cliente tiene **hosting compartido sin Node**.
- shadcn se montó **manual** porque su CLI 2.x no inicializa sin `tailwind.config.js` (Tailwind v4).
- El proyecto vive en el repo "Dreamlike" pero el nombre comercial del producto es **PymesAI**.
- Skill `caveman` activa en la sesión (modo de respuesta terse, no afecta al código).
