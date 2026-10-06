const menuToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
const currentYear = document.querySelector("#current-year");

function closeMenu() {
  if (!menuToggle || !navigation) {
    return;
  }

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    navigation.classList.toggle("is-open", !isExpanded);
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      !isExpanded ? "Cerrar menú de navegación" : "Abrir menú de navegación",
    );
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const marquee = document.querySelector(".tech-marquee");
const marqueeToggle = document.querySelector(".tech-marquee__toggle");

if (marquee && marqueeToggle) {
  if (reduceMotion) {
    marquee.classList.add("is-paused");
    marqueeToggle.textContent = "Animación desactivada";
    marqueeToggle.setAttribute(
      "aria-label",
      "Animación desactivada por preferencia de movimiento reducido",
    );
    marqueeToggle.disabled = true;
  } else {
    marqueeToggle.addEventListener("click", () => {
      const shouldPause = !marquee.classList.contains("is-paused");
      marquee.classList.toggle("is-paused", shouldPause);
      marqueeToggle.textContent = shouldPause ? "Reanudar animación" : "Pausar animación";
      marqueeToggle.setAttribute(
        "aria-label",
        `${shouldPause ? "Reanudar" : "Pausar"} animación de tecnologías`,
      );
    });
  }
}

const revealElements = document.querySelectorAll("[data-reveal]");

if (reduceMotion || !("IntersectionObserver" in window)) {
  for (const element of revealElements) {
    element.classList.add("is-visible");
  }
} else {
  document.body.classList.add("js-enabled");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (const element of revealElements) {
    revealObserver.observe(element);
  }
}

const typewriter = document.querySelector("[data-typewriter]");
const terminalText = 'const perfil = { nombre: "Ángel Briceño", titulo: "Bachiller Técnico en Desarrollo de Software", meta: "Arquitectura de Software" };';

if (typewriter) {
  if (reduceMotion) {
    typewriter.textContent = terminalText;
  } else {
    let characterIndex = 0;

    function typeNextCharacter() {
      typewriter.textContent = terminalText.slice(0, characterIndex);
      characterIndex += 1;

      if (characterIndex <= terminalText.length) {
        window.setTimeout(typeNextCharacter, 23);
      }
    }

    window.setTimeout(typeNextCharacter, 450);
  }
}

const finePointer = window.matchMedia("(pointer: fine)").matches;

if (finePointer && !reduceMotion) {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let animationFrame = 0;
  let hasPointerPosition = false;

  function followPointer() {
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;
    document.body.style.setProperty(
      "--spotlight-layer",
      `radial-gradient(320px circle at ${current.x}px ${current.y}px, rgb(139 92 246 / 8%), transparent 74%)`,
    );

    const distance = Math.hypot(target.x - current.x, target.y - current.y);
    if (distance > 0.15) {
      animationFrame = window.requestAnimationFrame(followPointer);
    } else {
      current.x = target.x;
      current.y = target.y;
      document.body.style.setProperty(
        "--spotlight-layer",
        `radial-gradient(320px circle at ${current.x}px ${current.y}px, rgb(139 92 246 / 8%), transparent 74%)`,
      );
      animationFrame = 0;
    }
  }

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }

    target.x = event.clientX;
    target.y = event.clientY;

    if (!hasPointerPosition) {
      current.x = target.x;
      current.y = target.y;
      hasPointerPosition = true;
    }

    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(followPointer);
    }
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    hasPointerPosition = false;
    document.body.style.setProperty(
      "--spotlight-layer",
      "radial-gradient(320px circle at 50vw 35vh, transparent, transparent 74%)",
    );
  });
}
