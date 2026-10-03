const projectCards = [...document.querySelectorAll("[data-project]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectSearch = document.querySelector("#project-search");
const projectResults = document.querySelector("#project-results");
const emptyState = document.querySelector("#empty-state");

let activeFilter = "all";

function updateProjects() {
  const query = projectSearch.value.trim().toLocaleLowerCase("es");
  let visibleCount = 0;

  for (const card of projectCards) {
    const categories = card.dataset.categories.split(/\s+/);
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("es");
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = query === "" || searchableText.includes(query);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    visibleCount += Number(isVisible);
  }

  emptyState.hidden = visibleCount > 0;
  projectResults.textContent = `${visibleCount} ${visibleCount === 1 ? "proyecto encontrado" : "proyectos encontrados"}.`;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }

    updateProjects();
  });
}

projectSearch.addEventListener("input", updateProjects);
updateProjects();