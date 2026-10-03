const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
const currentYear = document.querySelector("#current-year");
const storageKey = "angel-briceno-theme";
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)");

function readStoredTheme() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch (error) {
    console.warn("No fue posible leer la preferencia de tema guardada.", error);
    return null;
  }
}

function setTheme(theme, persist = false) {
  const isLight = theme === "light";
  root.dataset.theme = isLight ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");

  if (persist) {
    try {
      window.localStorage.setItem(storageKey, root.dataset.theme);
    } catch (error) {
      console.warn("No fue posible guardar la preferencia de tema.", error);
    }
  }
}

const storedTheme = readStoredTheme();
setTheme(storedTheme === "light" || storedTheme === "dark"
  ? storedTheme
  : systemPrefersLight.matches ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
});

systemPrefersLight.addEventListener("change", (event) => {
  if (readStoredTheme() === null) {
    setTheme(event.matches ? "light" : "dark");
  }
});

function closeMenu() {
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  navigation.classList.toggle("is-open", !isExpanded);
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", !isExpanded ? "Cerrar menú de navegación" : "Abrir menú de navegación");
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

currentYear.textContent = String(new Date().getFullYear());

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  for (const element of document.querySelectorAll("[data-reveal]")) {
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

  for (const element of document.querySelectorAll("[data-reveal]")) {
    revealObserver.observe(element);
  }
}