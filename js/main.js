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
const terminalText = 'const dev = { nombre: "Ángel Briceño", rol: "Frontend Dev", meta: "Arquitectura de Software" };';

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

const cursor = document.querySelector(".custom-cursor");
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (cursor && finePointer && !reduceMotion) {
  const interactiveSelector = [
    "a",
    "button",
    ".bento-card",
    ".studio-window",
    ".media-card",
    ".vision-card",
    ".tech-marquee__item",
  ].join(",");
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let animationFrame = 0;

  function followPointer() {
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;
    cursor.style.left = `${current.x}px`;
    cursor.style.top = `${current.y}px`;

    const distance = Math.hypot(target.x - current.x, target.y - current.y);
    if (distance > 0.15) {
      animationFrame = window.requestAnimationFrame(followPointer);
    } else {
      current.x = target.x;
      current.y = target.y;
      cursor.style.left = `${current.x}px`;
      cursor.style.top = `${current.y}px`;
      animationFrame = 0;
    }
  }

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    document.body.classList.add("has-custom-cursor");
    target.x = event.clientX;
    target.y = event.clientY;
    cursor.classList.add("is-visible");
    cursor.classList.toggle("is-active", Boolean(event.target.closest(interactiveSelector)));

    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(followPointer);
    }
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible", "is-active");
    document.body.classList.remove("has-custom-cursor");
  });

  window.addEventListener("blur", () => {
    cursor.classList.remove("is-visible", "is-active");
    document.body.classList.remove("has-custom-cursor");
  });
}
