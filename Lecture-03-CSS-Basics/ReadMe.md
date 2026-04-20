# Lecture 03 – CSS Basics

## What I implemented this lecture

- Applied foundational CSS styling to a semantic HTML page — controlling typography,
  spacing, colors, and layout using element, group, descendant, ID, and pseudo-class selectors
- Used the Box Model (margin, padding, border) to control spacing between and inside
  elements like sections, articles, figures, and the header/footer
- Made images and iframes responsive using max-width: 100% and height: auto so they
  never overflow their container regardless of screen size

## CSS selectors I used (at least 5)

- **Element selector** — `body`, `p`, `h1`, `h2`, `section`, `article`, `img`, `a`
  — targets all instances of that HTML tag directly
- **Group selector** — `header, footer` — applies the same blue background, white text,
  and padding to both elements in one rule instead of repeating the declaration twice
- **Descendant selector** — `header h3` — targets only `<h3>` elements that sit inside
  a `<header>`, leaving h3 elements elsewhere on the page unaffected
- **ID selector** — `#Profile`, `#Portfolio #interest`, `#Footer` — targets a single
  unique element by its id attribute, used here to add a border under the profile section
  and a border above the footer
- **Pseudo-class selector** — `a:hover`, `footer a:hover` — applies styles only when
  the user's mouse hovers over a link, creating a visual interaction cue without JavaScript

## One thing I struggled with

- Understanding the difference between margin and padding — both add space but in
  different places. Margin adds space _outside_ the element's border (pushing it away
  from neighbours), while padding adds space _inside_ the border (pushing content away
  from the edge of the element itself). I kept confusing which one to use when elements
  felt too close together or too cramped inside.

## One improvement I want to do next

- Add a media query so the layout adapts on smaller screens — for example, reducing
  the body padding, font sizes, and section padding on mobile so the page doesn't feel
  cramped on a phone. Currently the max-width: 900px works on desktop but the fixed
  padding and font sizes could be more flexible on narrower viewports.
