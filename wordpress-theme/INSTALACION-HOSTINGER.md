# PymesAI — Tema WordPress · Instalación en Hostinger

Tema a medida que replica la web de PymesAI (fondo animado, glassmorphism, formularios, quiz)
**totalmente editable desde el panel de WordPress** con Advanced Custom Fields (ACF).

---

## Qué necesitas

1. Hosting con WordPress instalado (Hostinger → **Auto Installer → WordPress**).
2. Plugin **Advanced Custom Fields PRO** (los repeaters — listas, soluciones, pasos — requieren la versión PRO).
   - Alternativa gratis: ACF free funciona para los textos sueltos; las listas usarán los valores por defecto.
3. Tu dominio apuntado a Hostinger (ya lo tienes).

---

## Paso 1 — Subir el tema

**Opción A (recomendada) — desde el panel de WordPress:**
1. Comprime la carpeta `pymesai/` en un ZIP → `pymesai.zip`.
2. WordPress → **Apariencia → Temas → Añadir nuevo → Subir tema**.
3. Sube `pymesai.zip` → **Instalar** → **Activar**.

**Opción B — por FTP / Administrador de archivos de Hostinger:**
1. Hostinger → **Administrador de archivos** (o FileZilla).
2. Sube la carpeta `pymesai/` a:
   `public_html/wp-content/themes/pymesai/`
3. WordPress → **Apariencia → Temas → Activar "PymesAI"**.

> Al activar el tema se crean **automáticamente** las 4 páginas (Inicio, Auditorías, Clientes, Chatbots)
> con sus plantillas y se fija "Inicio" como portada.

---

## Paso 2 — Instalar ACF

1. WordPress → **Plugins → Añadir nuevo**.
2. Busca **Advanced Custom Fields** (o sube el ZIP de ACF PRO) → **Instalar** → **Activar**.
3. Los campos editables aparecen solos en cada página (no hay que configurar nada).

---

## Paso 3 — Editar el contenido

1. WordPress → **Páginas** → abre **Inicio** / **Auditorías** / **Clientes** / **Chatbots**.
2. Debajo del editor verás los campos del tema:
   títulos, subtítulos, listas, soluciones, estadísticas, objeciones, etc.
3. Cambia el texto, guarda, y se refleja en la web.

> Los **menús** se gestionan en **Apariencia → Menús** (ubicaciones: "Menú principal" y "Menú legal (footer)").

---

## Paso 4 — Recibir los leads

Los formularios (auditoría, lista de clientes, demo chatbot) guardan cada envío en:

- **WordPress → Leads** (menú lateral) — historial completo.
- Además envían un **email** a la dirección del administrador (Ajustes → General → Email).

> Para mejorar la entrega de emails en Hostinger instala un plugin SMTP
> (p.ej. *WP Mail SMTP*) y configúralo con tu cuenta de correo del dominio.

---

## Notas técnicas

- **Sin build, sin Node.** Todo es PHP + CSS + JS vanilla. Funciona en hosting compartido.
- **Mobile-first.** Probado en 375px → 1440px.
- **Fondo animado** y **efectos** se cargan desde `assets/`. No dependen de servicios externos
  (salvo Google Fonts: Poppins + Inter).
- **Accesibilidad:** targets táctiles ≥44px, foco visible, `prefers-reduced-motion` respetado.

## Estructura del tema

```
pymesai/
  style.css                  cabecera del tema
  functions.php              setup, encolado, leads (CPT + email), creación de páginas
  header.php / footer.php    navbar + fondo animado / footer
  front-page.php             Inicio
  page-auditorias.php        Auditorías (con quiz overlay)
  page-clientes.php          Listas de clientes (tabla ejemplo)
  page-chatbots.php          Chatbots
  page.php / index.php       fallback (páginas legales)
  inc/acf-fields.php         todos los campos editables
  template-parts/            formularios + bloque de stats
  assets/css/main.css        estilos (glass, fondo, responsive)
  assets/js/main.js          fondo animado, navbar, forms, quiz, animaciones
```
