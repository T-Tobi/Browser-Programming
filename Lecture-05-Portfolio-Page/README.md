# Lecture 05 – JavaScript & DOM

## What was added

### 1. Skills section
A responsive CSS grid of 8 skill cards (HTML, CSS, JS, Python, IoT, LTspice, Data Analysis, Git).

### 2. Projects section
Two project articles, each with a title, description, and GitHub link.

### 3. Theme Toggle button
A button in the header toggles a `.dark` CSS class on `<body>`, switching between light and dark colour schemes. State is tracked with the `isDark` variable in `script.js`.

### 4. localStorage persistence
Theme preference is saved under the key `portfolio_theme` and applied automatically on every page load.

### 5. Last Updated
A `<p id="last-updated">` element in the footer is populated by JavaScript with today's date in `YYYY-MM-DD` format — never hard-coded.

## Files
| File | Purpose |
|------|---------|
| `Index.html` | Page structure and content |
| `style.css` | Styling, CSS variables, dark theme |
| `script.js` | Theme toggle, localStorage, last-updated date |
