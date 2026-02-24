/* ─────────────────────────────────────────────
   you love lamp© — main.js
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const html         = document.documentElement;

  const lampToggle   = document.getElementById('lamp-toggle');
  const lampIconOff  = document.getElementById('lamp-icon-off');   // 💡 left
  const lampIconSun  = document.getElementById('lamp-icon-sun');   // ☀️ right

  const themeToggle  = document.getElementById('theme-toggle');
  const themeIconMoon = document.getElementById('theme-icon-moon'); // 🌙 left
  const themeIconSun  = document.getElementById('theme-icon-sun');  // ☀️ right

  /* ── Helpers ── */
  function setLampState(on) {
    html.dataset.lamps = on ? 'on' : 'off';

    // Toggle active classes on icons
    lampIconOff.classList.toggle('is-active', !on);
    lampIconSun.classList.toggle('is-active',  on);

    // Persist preference
    try { localStorage.setItem('youlovelamp-lamps', on ? 'on' : 'off'); } catch (_) {}
  }

  function setTheme(dark) {
    html.dataset.theme = dark ? 'dark' : 'light';

    themeIconMoon.classList.toggle('is-active',  dark);
    themeIconSun.classList.toggle('is-active',  !dark);

    try { localStorage.setItem('youlovelamp-theme', dark ? 'dark' : 'light'); } catch (_) {}
  }

  /* ── Restore persisted preferences ── */
  function restorePreferences() {
    let savedTheme = null;
    let savedLamps = null;

    try {
      savedTheme = localStorage.getItem('youlovelamp-theme');
      savedLamps = localStorage.getItem('youlovelamp-lamps');
    } catch (_) {}

    // Theme: default light
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    themeToggle.checked = !useDark;   // checked = light (sun side active)
    setTheme(useDark);

    // Lamps: default off
    const lampsOn = savedLamps === 'on';
    lampToggle.checked = lampsOn;
    setLampState(lampsOn);
  }

  /* ── Event listeners ── */

  // Lamp toggle: OFF(left) ──── ON(right)
  // unchecked = off (bulb icon active), checked = on (sun icon active)
  lampToggle.addEventListener('change', () => {
    setLampState(lampToggle.checked);
  });

  // Theme toggle: DARK(left) ──── LIGHT(right)
  // unchecked = dark (moon icon active), checked = light (sun icon active)
  themeToggle.addEventListener('change', () => {
    setTheme(!themeToggle.checked);
  });

  /* ── Init ── */
  restorePreferences();

})();
