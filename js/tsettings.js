const buttons = document.querySelectorAll(".theme-button");
const storageKey = "selectedTheme";

// Load the previously selected theme from local storage, if it exists
let selectedTheme = localStorage.getItem(storageKey);

// If no previously selected theme, set the default theme
if (!selectedTheme) {
  selectedTheme = "default";
  document.body.setAttribute("data-theme", selectedTheme);
  // Save the default theme to local storage
  localStorage.setItem(storageKey, selectedTheme);
} else {
  document.body.setAttribute("data-theme", selectedTheme);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, theme);
  });
});