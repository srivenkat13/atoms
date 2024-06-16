document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const soundToggle = document.getElementById("sound-on");

  // Check and apply the user's preferred color scheme
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Apply the saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // Toggle between light and dark themes
  themeToggleBtn.addEventListener("click", () => {
    soundToggle.play();
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme preference
    themeToggleBtn.textContent = `${currentTheme === "dark" ? "🌙" : "🌞"} `;
  });
});
