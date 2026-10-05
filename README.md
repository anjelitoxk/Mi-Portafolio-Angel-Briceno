# Mi Portafolio — Ángel Briceño

Portafolio personal de Ángel Orlando Briceño Chacón, desarrollador frontend en Medellín, Colombia. Presenta su enfoque en automatización y simplificación de procesos, su participación en el Semillero Quipux Aulas de Ciudad, su formación técnica y proyectos.

## Estructura

```text
.
├── css/
│   ├── main.css       # Variables, estilos globales y utilidades
│   ├── components.css # Componentes y secciones
│   └── responsive.css # Adaptaciones para pantallas pequeñas
├── assets/
│   └── images/        # Retrato y logos de LJV, UPB y Quipux
├── js/
│   └── main.js        # Menú, terminal, cursor Lerp y animaciones de entrada
└── index.html
```

## Decisiones de diseño y rendimiento

- Diseño responsive, con HTML semántico, navegación por teclado y menú móvil accesible.
- Tema oscuro con fondo `#0d0e12`, superficies glassmorphism y acentos morados `#8b5cf6` / `#a78bfa`.
- La ventana de código integra el retrato con máscara degradada, una terminal typewriter y un widget de concentración.
- La navegación presenta la formación técnica, el proyecto Interclases LJV y la proyección profesional hacia Quipux.
- Los logos de LJV, UPB y Quipux se sirven localmente; los fondos claros de origen se preparan con transparencia cuando aplica.
- El cursor Lerp se activa solo con puntero fino y respeta `prefers-reduced-motion`; las animaciones de entrada usan `IntersectionObserver`.
- La cinta infinita utiliza iconos Devicon y pausa al pasar el cursor; las tecnologías siguen legibles si el CDN no está disponible.
- CSS y JavaScript están separados; Inter y DM Mono se sirven desde Google Fonts, Devicon desde jsDelivr. El sitio no requiere un proceso de compilación.

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

## Enlaces del proyecto

El enlace de Interclases dirige al perfil público de GitHub porque todavía no se ha configurado una URL específica para el repositorio o una demo pública. Actualiza ese destino en `index.html` cuando estén disponibles.