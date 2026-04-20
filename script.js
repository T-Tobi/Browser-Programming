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
  // Button label shows what you'll switch TO
  themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("portfolio-theme", theme);
}

// Load saved preference
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

/* ── 4. External Data Demo ─────────────────── */
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
