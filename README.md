# Mi Portafolio — Ángel Briceño

Portafolio personal de Ángel Orlando Briceño Chacón, desarrollador frontend en Medellín, Colombia. El sitio presenta proyectos, tecnologías y principios de trabajo en una experiencia responsive con tema claro y oscuro.

## Estructura

```text
.
├── assets/
│   ├── docs/       # Hoja de vida descargable
│   ├── icons/      # Iconos locales (si se agregan)
│   └── images/     # Imágenes de proyectos (si se agregan)
├── css/
│   ├── main.css    # Variables, estilos globales y navegación
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js     # Tema, menú móvil y animaciones de entrada
│   └── projects.js # Búsqueda y filtros de proyectos
└── index.html
```

## Decisiones de diseño y rendimiento

- Diseño mobile-first, con HTML semántico, navegación por teclado y estados accesibles para controles.
- El tema inicial respeta la preferencia del sistema; la selección manual se guarda en `localStorage`.
- La búsqueda y los filtros funcionan en el navegador, sin dependencias ni solicitudes adicionales.
- Las animaciones de entrada usan `IntersectionObserver` y respetan `prefers-reduced-motion`.
- CSS, JavaScript y recursos están separados; las fuentes se sirven desde Google Fonts y el sitio no requiere un proceso de compilación.

## Ejecutar localmente

Abre `index.html` en un navegador o inicia cualquier servidor estático desde la raíz del proyecto. Por ejemplo, con Python instalado:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [Vercel](https://vercel.com/new), importa el repositorio.
3. Deja en blanco el comando de build y selecciona la raíz del proyecto como directorio de salida.
4. Pulsa **Deploy**. Cada actualización de la rama configurada publicará una nueva versión.

## Despliegue en Netlify

1. Sube el repositorio a GitHub.
2. En [Netlify](https://app.netlify.com/start), importa un proyecto desde Git.
3. Selecciona el repositorio y deja vacíos el comando de build y el directorio de publicación (raíz del repositorio).
4. Pulsa **Deploy site**. Netlify publicará los cambios nuevos al actualizar la rama.

## Personalización pendiente

Coloca tu hoja de vida en `assets/docs/hoja-de-vida-angel-briceno.pdf` para habilitar la descarga del botón del Hero. Añade enlaces reales de GitHub y demo al proyecto cuando estén disponibles; por ahora el sitio no inventa destinos para esos recursos.