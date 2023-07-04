const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");
const main = document.getElementById("main");

navToggle.addEventListener("click", (_) => {
  nav.classList.toggle("open");
  main.classList.toggle("shrinked");
});
