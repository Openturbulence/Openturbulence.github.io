// Small interaction layer for GitHub Pages.
// Homepage carousel dots, same-page navigation state, and dataset filtering.

const dots = document.querySelectorAll(".dots button");
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    dots.forEach((item) => item.classList.remove("is-active"));
    dot.classList.add("is-active");
  });
});

const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav() {
  if (!navLinks.length || !sections.length) return;

  let currentId = "top";
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) currentId = section.id || "top";
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

const datasetCards = Array.from(document.querySelectorAll(".dataset-card"));
const datasetCount = document.querySelector("#dataset-count");
const filterInputs = Array.from(document.querySelectorAll(".filter-option input"));
const applyFiltersBtn = document.querySelector(".apply-filters");
const clearFiltersBtn = document.querySelector(".clear-filters");
const sortSelect = document.querySelector(".sort-control select");
const datasetGrid = document.querySelector(".dataset-grid");

function checkedValues(name) {
  return filterInputs
    .filter((input) => input.name === name && input.checked)
    .map((input) => input.value);
}

function cardMatches(card) {
  const flows = checkedValues("flow");
  const geometries = checkedValues("geometry");
  const solvers = checkedValues("solver");

  const flowOk = flows.length === 0 || flows.includes(card.dataset.flow);
  const geometryOk = geometries.length === 0 || geometries.includes(card.dataset.geometry);
  const solverOk = solvers.length === 0 || solvers.includes(card.dataset.solver);

  return flowOk && geometryOk && solverOk;
}

function updateDatasetCount() {
  if (!datasetCount) return;
  const visibleCount = datasetCards.filter((card) => !card.classList.contains("is-hidden")).length;
  datasetCount.textContent = visibleCount;
}

function applyDatasetFilters() {
  if (!datasetCards.length) return;
  datasetCards.forEach((card) => {
    card.classList.toggle("is-hidden", !cardMatches(card));
  });
  updateDatasetCount();
}

function sortDatasets() {
  if (!sortSelect || !datasetGrid) return;

  const cards = Array.from(datasetGrid.querySelectorAll(".dataset-card"));
  const mode = sortSelect.value;

  const sorted = cards.sort((a, b) => {
    if (mode === "Name (Z-A)") return b.dataset.name.localeCompare(a.dataset.name);
    if (mode === "Flow Type") return a.dataset.flow.localeCompare(b.dataset.flow) || a.dataset.name.localeCompare(b.dataset.name);
    if (mode === "Solver") return a.dataset.solver.localeCompare(b.dataset.solver) || a.dataset.name.localeCompare(b.dataset.name);
    return a.dataset.name.localeCompare(b.dataset.name);
  });

  sorted.forEach((card) => datasetGrid.appendChild(card));
}

applyFiltersBtn?.addEventListener("click", applyDatasetFilters);
filterInputs.forEach((input) => input.addEventListener("change", applyDatasetFilters));
clearFiltersBtn?.addEventListener("click", () => {
  filterInputs.forEach((input) => { input.checked = false; });
  applyDatasetFilters();
});
sortSelect?.addEventListener("change", () => {
  sortDatasets();
  applyDatasetFilters();
});
