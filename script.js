// Small interaction layer for GitHub Pages.
// It keeps the carousel dots and navigation states visually consistent with the static design.

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
