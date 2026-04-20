# Lecture 04 – JavaScript Basics

## What I implemented this lecture

- Connected JavaScript to the browser by selecting HTML elements using
  `document.getElementById()` and attaching click event listeners to two buttons —
  a theme toggle and a contact button — making the page interactive without any page reloads
- Managed application state using a boolean variable `isDarkMode` that tracks whether
  dark mode is currently on or off, and toggled it with `!isDarkMode` on every button
  click so the page always knows its own current condition
- Used `document.body.classList.toggle()` to dynamically add and remove a CSS class
  (`dark-mode`) from the body element, letting CSS handle the visual change while
  JavaScript only handles the logic of when to trigger it

## JavaScript concepts I used (at least 5)

- **`let` vs `const`** — `isDarkMode` is declared with `let` because its value changes
  every time the button is clicked; `contactEmail` is declared with `const` because it
  never changes — using the right keyword communicates intent and prevents accidental reassignment
- **Functions** — `setTheme()` and `showContact()` are named functions that group related
  logic into reusable, readable blocks; defining them separately from the event listeners
  keeps the code organised and easier to debug
- **Boolean toggle** — `isDarkMode = !isDarkMode` flips the value from `true` to `false`
  or `false` to `true` on every call — this is the core pattern for any on/off state in JavaScript
- **DOM manipulation** — `document.body.classList.toggle("dark-mode")` reaches into the
  live HTML document and adds or removes a class in real time, bridging JavaScript logic
  with CSS visual output
- **Event listeners** — `addEventListener("click", setTheme)` attaches a function to a
  button so it runs only when the user clicks it, rather than running immediately when
  the page loads; the function is passed by name without `()` so it is referenced, not called
- **`console.log()`** — used throughout to trace what the program is doing at each step,
  which is the fundamental debugging technique for confirming code runs and variables
  hold the expected values

## One thing I struggled with

- Understanding why the function is written as `addEventListener("click", setTheme)`
  and not `addEventListener("click", setTheme())` — the difference is that without the
  brackets, you are passing the function itself as a reference to be called later when
  the click happens; with the brackets, you would call it immediately when the page
  loads and pass whatever it returns (nothing) to the listener instead, so the button
  would never actually work

## One improvement I want to do next

- Persist the dark mode preference using `localStorage` so that if the user enables dark
  mode and then refreshes the page, it stays dark instead of resetting to light mode —
  this would require saving `isDarkMode` to localStorage on every toggle and reading it
  back on page load to apply the correct class before anything renders
