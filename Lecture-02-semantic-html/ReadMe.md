Lecture 02 – Semantic HTML & Structure

1. What I implemented this lecture

- Built a structured personal profile page that has header, profile content, portfolio, areas of interest and footer.
- used Semantic contents elements such as header, section, article, figure, figcaption, footer for clearer meaning and structure.
- I also added multiple internal navigation links using anchor links such as skip to portfolio, skip to interest, skip to profile etc.
- I used Img, href, iframes to introduce digital contents and links to external pages such as linkedin and GitHub Repo.

2. Semantic decisions I made (REQUIRED)

Decision 1

- Element(s) used: `<header>` (with headings)
- Where in the page: Top of the page for name + role
- Why this element is semantically correct: `<header>` represents the introductory content of the page (identity + title), which helps browsers and assistive technologies understand the page’s main heading area.

Decision 2

- Element(s) used: `<section>` for “Portfolio” and “Areas of Interest”
- Where in the page: Mid-page blocks separating major topics (portfolio media and interests lists)
- Why this element is semantically correct: A `<section>` groups related content under a theme with its own heading, making the document outline clearer than using generic `<div>` containers.

Decision 3

- Element(s) used: `<article>` inside the “Areas of Interest” section
- Where in the page: Sub-groups (“Technology & Learning”, “Personal Interest”, “Future Plans”)
- Why this element is semantically correct: Each `<article>` groups a self-contained set of related items that could stand on its own as a mini-topic within interests, improving structure and readability.

Decision 4

- Element(s) used: `<figure>` + `<figcaption>` around image/iframe
- Why: Media and caption belong together; `<figure>` clearly communicates “this media with this caption is one unit.”

3. Accessibility considerations

- Included "alt text" on the image (`alt="Sample Portfolio Img"`) so screen readers can describe the image content.
- Added a "title attribute" to the embedded iframe (“Semantic Html Youtube Video”) to describe the embedded content.
- Added "skip/jump navigation links" (e.g., skip to page end, jump to sections) to reduce scrolling and improve keyboard navigation.

4. What I learned

- How semantic HTML elements (header/section/article/figure/footer) create a clearer page structure and improve readability for both humans and assistive technology.

5. What I still need to improve

- The proper combination of the semantics.

6. Notes about AI usage (if any)

- Tool used: ChatGPT, GitHub Repo, Youtube Videos, W3 Schools, geeksforgeeks
- What I accepted as-is:Used Ai to properly word the readme section.
- What I modified manually: I used the above resources to learn the use of elements but the ordering and contents were mine.
