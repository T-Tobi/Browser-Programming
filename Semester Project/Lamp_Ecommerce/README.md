# Light Image Example (HTML + CSS only)

This project is a **CSS-only** image showcase that displays a **4-item lamp gallery** with two global toggles:

- **Day / Night**
- **Lamp On / Off**

When you toggle either setting, each card **crossfades** to the correct image variant.

## Asset naming convention (required)

Images live in the project root and follow this exact format:

`[light id]-light-[state of the light]-[day or night]`

Examples:

- `1-light-on-day.jpeg`
- `1-light-off-night.png`

For each lamp id (1–4) there are **four** variants:

- `*-light-on-day`
- `*-light-on-night`
- `*-light-off-day`
- `*-light-off-night`

## How the CSS-only toggles work

Because this project uses **HTML and CSS only** (no JavaScript), the UI uses two hidden checkbox inputs:

- `#timeToggle` controls Day vs Night
- `#powerToggle` controls Off vs On

Each lamp card contains **four stacked `<img>` elements** (one per state).
CSS uses selectors like:

- `#timeToggle:checked ~ main ...`
- `#powerToggle:checked ~ main ...`
- combined selectors for all 4 combinations

Only the matching image has `opacity: 1`; all others are `opacity: 0`.
A `transition: opacity ...` on the images produces the **fade** between states.

## Theme

- **Night mode** uses a **pure black** page background (`#000`).
