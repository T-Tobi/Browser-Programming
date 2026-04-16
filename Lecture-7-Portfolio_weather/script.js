// ========================================
// script.js – Lecture 05: JavaScript & DOM
// ========================================

// ===== REQUIREMENT 3 & 4: Theme Toggle + localStorage =====

// State variable tracking whether dark mode is active
let isDark = false;

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// REQUIREMENT 4: On page load, read saved preference from localStorage
const savedTheme = localStorage.getItem("portfolio_theme");
if (savedTheme === "dark") {
  isDark = true;
  body.classList.add("dark");
  toggleBtn.textContent = "Light Mode ☀️";
} else {
  toggleBtn.textContent = "Dark Mode 🌙";
}

// REQUIREMENT 3: Toggle theme on button click
toggleBtn.addEventListener("click", function () {
  isDark = !isDark; // flip state variable

  if (isDark) {
    body.classList.add("dark");
    toggleBtn.textContent = "Light Mode ☀️";
  } else {
    body.classList.remove("dark");
    toggleBtn.textContent = "Dark Mode 🌙";
  }

  // REQUIREMENT 4: Save new preference to localStorage
  localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
});

// ===== REQUIREMENT 5: Last Updated =====
// Generate today's date automatically – never typed manually
const lastUpdatedEl = document.getElementById("last-updated");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
lastUpdatedEl.textContent = "Last updated: " + yyyy + "-" + mm + "-" + dd;
