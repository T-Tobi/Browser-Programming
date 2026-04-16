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

// ===== REQUIREMENT 6: External Data Demo (async/await + fetch) =====

const btnLoadData = document.getElementById("btnLoadData");
const dataOutput = document.getElementById("dataOutput");

async function loadUserData() {
  // Show loading message immediately
  dataOutput.textContent = "Loading…";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }

    const user = await response.json();

    // Clear loading message
    dataOutput.textContent = "";

    // Dynamically create DOM elements (no hardcoded HTML)
    const card = document.createElement("div");
    card.className = "project-card";

    const nameHeading = document.createElement("h3");
    nameHeading.textContent = user.name;
    card.appendChild(nameHeading);

    const emailPara = document.createElement("p");
    const emailLabel = document.createElement("b");
    emailLabel.textContent = "Email: ";
    const emailValue = document.createElement("i");
    emailValue.textContent = user.email;
    emailPara.appendChild(emailLabel);
    emailPara.appendChild(emailValue);
    card.appendChild(emailPara);

    const companyPara = document.createElement("p");
    const companyLabel = document.createElement("b");
    companyLabel.textContent = "Company: ";
    const companyValue = document.createElement("i");
    companyValue.textContent = user.company.name;
    companyPara.appendChild(companyLabel);
    companyPara.appendChild(companyValue);
    card.appendChild(companyPara);

    dataOutput.appendChild(card);
  } catch (error) {
    dataOutput.textContent = "Error loading data";
  }
}

btnLoadData.addEventListener("click", loadUserData);
