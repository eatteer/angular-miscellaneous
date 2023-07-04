// Toggle nav menu
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", (e) => {
  nav.classList.toggle("open");
});

// Calculate Y margin for main content when resizing window
const mainContent = document.getElementById("main-content");
const mobileNav = document.getElementById("mobile-nav");

document.addEventListener("DOMContentLoaded", (e) =>
  calculateMainContentYMargin()
);

window.addEventListener("resize", (e) => calculateMainContentYMargin());

const calculateMainContentYMargin = () => {
  const mobileNavHeight = mobileNav.clientHeight;
  const documentClientWidth = document.documentElement.clientWidth;
  if (documentClientWidth >= 1024) {
    const margin = `1rem 0 1rem 0`;
    mainContent.style.margin = margin;
  } else {
    const mainContentMargin = `1rem 0 calc(1rem + ${mobileNavHeight}px) 0`;
    mainContent.style.margin = mainContentMargin;
  }
};
