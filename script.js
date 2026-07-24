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

let appliedFilters = {
  flow: [],
  geometry: [],
  solver: [],
};

function selectedValues(name) {
  return filterInputs
    .filter((input) => input.name === name && input.checked)
    .map((input) => input.value);
}

function readSelectedFilters() {
  return {
    flow: selectedValues("flow"),
    geometry: selectedValues("geometry"),
    solver: selectedValues("solver"),
  };
}

function hasPendingFilterChanges() {
  const selected = readSelectedFilters();
  return ["flow", "geometry", "solver"].some((key) => {
    const current = [...selected[key]].sort().join("|");
    const applied = [...appliedFilters[key]].sort().join("|");
    return current !== applied;
  });
}

function updateApplyButtonState() {
  if (!applyFiltersBtn) return;
  const pending = hasPendingFilterChanges();
  applyFiltersBtn.classList.toggle("has-pending", pending);
  applyFiltersBtn.setAttribute(
    "aria-label",
    pending ? "Apply pending dataset filters" : "Apply dataset filters"
  );
}

function cardMatchesAppliedFilters(card) {
  const flowOk = appliedFilters.flow.length === 0 || appliedFilters.flow.includes(card.dataset.flow);
  const geometryOk = appliedFilters.geometry.length === 0 || appliedFilters.geometry.includes(card.dataset.geometry);
  const solverOk = appliedFilters.solver.length === 0 || appliedFilters.solver.includes(card.dataset.solver);

  return flowOk && geometryOk && solverOk;
}

function updateDatasetCount() {
  if (!datasetCount) return;
  const visibleCount = datasetCards.filter((card) => !card.classList.contains("is-hidden")).length;
  datasetCount.textContent = visibleCount;
}

function applyDatasetFilters() {
  if (!datasetCards.length) return;
  appliedFilters = readSelectedFilters();
  datasetCards.forEach((card) => {
    card.classList.toggle("is-hidden", !cardMatchesAppliedFilters(card));
  });
  updateDatasetCount();
  updateApplyButtonState();
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

// 只勾选小白框时，不再立即筛选；必须点击 Apply Filters 后才执行筛选。
filterInputs.forEach((input) => {
  input.addEventListener("change", updateApplyButtonState);
});

// Clear all 只清空勾选状态，不立即改变右侧结果；需要再点 Apply Filters 确认。
clearFiltersBtn?.addEventListener("click", () => {
  filterInputs.forEach((input) => { input.checked = false; });
  updateApplyButtonState();
});

sortSelect?.addEventListener("change", () => {
  sortDatasets();
});

updateDatasetCount();
updateApplyButtonState();


// Featured Visualization carousel
(function () {
  const carousel = document.querySelector("#featuredCarousel");
  if (!carousel) return;

  const track = carousel.querySelector(".featured-carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".featured-slide"));
  const dots = Array.from(carousel.querySelectorAll(".featured-dot"));

  if (!track || slides.length === 0 || dots.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 3500;
  let timer = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  showSlide(0);
  startAutoPlay();
})();

// Leadership & Contributors carousel on the About page.
// This is isolated from dataset filters and homepage visualization carousel.
(function () {
  const carousel = document.querySelector("#teamCarousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".team-carousel-viewport");
  const track = carousel.querySelector(".team-carousel-track");
  const cards = Array.from(carousel.querySelectorAll(".team-card"));
  const prevButton = carousel.querySelector(".team-carousel-prev");
  const nextButton = carousel.querySelector(".team-carousel-next");

  if (!viewport || !track || cards.length === 0 || !prevButton || !nextButton) return;

  let currentIndex = 0;

  function getCardsPerView() {
    if (window.matchMedia("(max-width: 640px)").matches) return 1;
    if (window.matchMedia("(max-width: 900px)").matches) return 2;
    return 3;
  }

  function clampIndex(index) {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    return Math.min(Math.max(index, 0), maxIndex);
  }

  function updateCarousel() {
    currentIndex = clampIndex(currentIndex);
    const targetCard = cards[currentIndex];
    const offset = targetCard ? targetCard.offsetLeft : 0;

    track.style.transform = `translateX(-${offset}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= Math.max(0, cards.length - getCardsPerView());
  }

  prevButton.addEventListener("click", () => {
    currentIndex = clampIndex(currentIndex - getCardsPerView());
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = clampIndex(currentIndex + getCardsPerView());
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel, { passive: true });
  window.addEventListener("load", updateCarousel);

  updateCarousel();
})();

