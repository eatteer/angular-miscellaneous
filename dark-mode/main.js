const toggle = document.querySelector(".toggle-button");

toggle.addEventListener("click", () => {
  const doc = document.documentElement;
  const className = doc.className;

  // Use regular expression to extract the name
  const [theme, variant] = className.match(/theme-(\w+)/);
  const isThemeLight = theme === "theme-light";
  if (isThemeLight) {
    doc.classList.replace("theme-light", "theme-dark");
  } else {
    doc.classList.replace("theme-dark", "theme-light");
  }
});
