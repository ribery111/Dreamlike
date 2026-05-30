@AGENTS.md

# Proyecto: PymesAI Web

## Stack
- **Framework:** Next.js 16 (App Router, `src/` dir)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes:** shadcn/ui (manual, sin CLI — ver estructura abajo)
- **Animaciones:** framer-motion
- **Iconos:** lucide-react

## Comandos
```bash
npm run dev      # servidor de desarrollo en localhost:3000
npm run build    # build de producción
npm run lint     # lint
```

## Estructura de archivos
```
src/
  app/
    globals.css       # estilos globales + keyframes de animación
    layout.tsx
    page.tsx
  components/
    ui/               # componentes shadcn/ui aquí siempre
  lib/
    utils.ts          # función cn() de shadcn
```

## Componentes instalados
- `src/components/ui/background-gradient-animation.tsx` — animación de gradiente interactiva
- `src/components/ui/background-gradient-animation-demo.tsx` — demo de uso

## Marca — PymesAI
- **Azul principal:** #2563EB
- **Azul oscuro:** #0F172A
- **Gris medio:** #64748B
- **Gris claro:** #F1F5F9
- **Tipografía títulos:** Poppins 600-700
- **Tipografía cuerpo:** Inter 400-500
- **Tono:** Directo, consultor senior, sin jerga técnica, hablar de resultados no de tecnología

## Páginas a construir (en orden)
1. **HOME** — visión general + derivar a las 3 soluciones
2. **AUDITORÍAS** — producto de entrada, prioridad máxima, con quiz overlay
3. **LISTA DE CLIENTES POTENCIALES** — upsell
4. **CHATBOTS** — automatización

## Reglas UX obligatorias
- Máximo 1 CTA principal por pantalla
- Hero comprensible en menos de 6 segundos
- Formularios con barra de progreso visible
- PROHIBIDO: sliders automáticos, popups invasivos
- Mobile first siempre
- Sin texto relleno

## Nuevos componentes UI
Siempre colocarlos en `src/components/ui/`
Siempre usar `cn()` de `@/lib/utils` para clases condicionales
