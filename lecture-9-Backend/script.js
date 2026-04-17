/**
 * script.js
 * Handles fetching from the Express backend and rendering results.
 */

const API_BASE = "http://localhost:3000";

/* ── Helpers ────────────────────────────────────────────── */

function showLoading(id) {
  const el = document.getElementById(id);
  el.innerHTML = `
    <div class="loading" role="status" aria-label="Loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <span>Fetching&hellip;</span>
    </div>`;
}

function showError(id, message) {
  const el = document.getElementById(id);
  el.innerHTML = `
    <p class="error" role="alert">
      &#9888; ${message}
    </p>`;
}

function renderFields(id, fields) {
  const el = document.getElementById(id);
  el.innerHTML = fields
    .map(
      ({ key, value, mono }) => `
      <div class="field">
        <span class="field-key">${key}</span>
        <span class="field-value ${mono ? "field-value--mono" : ""}">${value}</span>
      </div>`
    )
    .join("");
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/* ── Fetch functions ────────────────────────────────────── */

function getMessage() {
  showLoading("message-output");

  fetch(`${API_BASE}/api/message`)
    .then((res) => res.json())
    .then((data) => {
      renderFields("message-output", [
        { key: "message", value: data.message },
        { key: "course",  value: data.course },
        { key: "year",    value: data.year },
        { key: "time",    value: formatDate(data.time), mono: true },
      ]);
    })
    .catch(() =>
      showError("message-output", "Could not reach server. Is it running?")
    );
}

function getStudent() {
  showLoading("student-output");

  fetch(`${API_BASE}/api/student`)
    .then((res) => res.json())
    .then((data) => {
      renderFields("student-output", [
        { key: "name", value: data.name },
        { key: "role", value: data.role },
      ]);
    })
    .catch(() =>
      showError("student-output", "Could not reach server. Is it running?")
    );
}
