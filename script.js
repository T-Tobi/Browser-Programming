/* ============================================
   Oluwatobiloba Ashaolu — Portfolio Script
   ============================================ */

/* ── 1. Scroll-reveal for project cards ───── */
const cards = document.querySelectorAll(".project-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
cards.forEach((card) => observer.observe(card));

/* ── 2. Theme Toggle ───────────────────────── */
const themeToggle = document.getElementById("theme-toggle");
const themeLabel  = document.getElementById("theme-label");
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("portfolio-theme", theme);
}

applyTheme(localStorage.getItem("portfolio-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ── 3. Last Updated ───────────────────────── */
const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  lastUpdatedEl.textContent = "Last updated: " + formatted;
}

/* ── 4. Weather Modal ──────────────────────── */
const weatherModal = document.getElementById("weather-modal");
const modalWeatherBox = document.getElementById("modal-weather-box");

function openWeatherDashboard() {
  weatherModal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  // Focus the first city button for accessibility
  const firstBtn = weatherModal.querySelector(".weather-city-btn");
  if (firstBtn) firstBtn.focus();
}

function closeWeatherDashboard() {
  weatherModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
  // Return focus to the button that opened the modal
  document.getElementById("weather-btn").focus();
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !weatherModal.hasAttribute("hidden")) {
    closeWeatherDashboard();
  }
});

async function loadWeather(cityName, latitude, longitude) {
  // Mark active button
  document.querySelectorAll(".weather-city-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent.trim() === cityName);
  });

  modalWeatherBox.classList.remove("loaded");
  modalWeatherBox.innerHTML = '<p class="weather-status">Loading weather data…</p>';

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + latitude +
      "&longitude=" + longitude +
      "&current=temperature_2m,wind_speed_10m";

    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP Error: " + response.status);

    const data        = await response.json();
    const temperature = data.current.temperature_2m;
    const wind        = data.current.wind_speed_10m;
    const time        = data.current.time;

    const tempRounded = Math.round(temperature);
    const tempEmoji   = temperature < 0 ? "🥶" : temperature < 10 ? "🌧" : "☀️";

    modalWeatherBox.classList.add("loaded");
    modalWeatherBox.innerHTML = `
      <div class="weather-data-row">
        <span class="weather-data-label">City</span>
        <span class="weather-data-value">${cityName}</span>
      </div>
      <div class="weather-data-row">
        <span class="weather-data-label">Temperature</span>
        <span class="weather-data-value">${tempEmoji} ${tempRounded} °C</span>
      </div>
      <div class="weather-data-row">
        <span class="weather-data-label">Wind Speed</span>
        <span class="weather-data-value">💨 ${wind} km/h</span>
      </div>
      <div class="weather-data-row">
        <span class="weather-data-label">Recorded At</span>
        <span class="weather-data-value">${time.replace("T", " ")}</span>
      </div>
    `;
  } catch (error) {
    modalWeatherBox.innerHTML =
      '<p class="weather-status weather-status--error">⚠ Could not load weather data: ' + error.message + "</p>";
  }
}

/* ── 5. External Data Demo (kept for reference) */
const btnLoadData  = document.getElementById("btnLoadData");
const btnClearData = document.getElementById("btnClearData");
const dataOutput   = document.getElementById("dataOutput");

if (btnLoadData) {
  btnLoadData.addEventListener("click", async () => {
    dataOutput.textContent = "Loading...";
    btnLoadData.disabled = true;

    try {
      const response = await fetch("https://randomuser.me/api/");
      if (!response.ok) throw new Error("HTTP Error: " + response.status);

      const data   = await response.json();
      const person = data.results[0];
      const name   = `${person.name.first} ${person.name.last}`;
      const email  = person.email;
      const city   = person.location.city;
      const country= person.location.country;

      dataOutput.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Location:</strong> ${city}, ${country}
      `;
    } catch (err) {
      dataOutput.textContent = "Error: " + err.message;
    } finally {
      btnLoadData.disabled = false;
    }
  });
}

if (btnClearData) {
  btnClearData.addEventListener("click", () => {
    dataOutput.textContent = "";
  });
}
