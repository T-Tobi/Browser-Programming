# Lecture 05 – Portfolio Update: Async & Fetch

## What I implemented this lecture

- Added a dark mode toggle that flips a boolean state variable on every click, adds or
  removes a CSS class from the body, and updates the button label to reflect the current
  mode — all without any page reload
- Persisted the dark mode preference using `localStorage` so the user's chosen theme
  survives page refreshes — on load the saved value is read first and the correct theme
  is applied before anything renders, preventing a flash of the wrong theme
- Generated today's date dynamically using the JavaScript `Date` object and injected it
  into the DOM so the "Last updated" line is always accurate without ever being typed
  manually
- Fetched real external data from a live API using `async/await` and `fetch()`, then
  built the entire result card from scratch using `document.createElement()` — no HTML
  was hardcoded, every element was created and appended through JavaScript

## Technical requirements met

### `async/await`

```js
async function loadUserData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
}
```

// Why do we use async/await?
// fetch() does not return data instantly — it returns a Promise.
// Without async/await we would have to chain .then() calls which gets
// harder to read as steps increase. async/await lets us write the steps
// top to bottom like normal code while still waiting for each Promise
// to resolve before moving to the next line. The browser stays
// interactive the whole time because await only pauses this function,
// not the entire page.

---

### `response.ok` check

```js
if (!response.ok) {
  throw new Error("Network response was not ok: " + response.status);
}
```

// Why do we check response.ok?
// fetch() only throws an error if there is a total network failure —
// like no internet connection. If the server responds with a 404 or 500
// status, fetch still resolves the Promise as if everything worked fine.
// Without checking response.ok we would silently continue with a broken
// or empty response and get confusing bugs. Checking it and throwing
// manually forces the catch block to handle the failure properly.

---

### `try/catch`

```js
try {
  const response = await fetch(...);
  if (!response.ok) { throw new Error(...); }
  const user = await response.json();
} catch (error) {
  dataOutput.textContent = "Error loading data";
}
```

// Why do we use try/catch?
// Any line inside an async function can fail — the network could be
// down, the server could return an error, or the JSON could be malformed.
// try/catch wraps all of that in one safety net. If anything goes wrong
// anywhere in the try block, execution jumps straight to catch and we
// can handle it gracefully instead of the whole function crashing
// silently or showing broken output to the user.

---

### Dynamic DOM (no hardcoded HTML)

```js
const card = document.createElement("div");
const nameHeading = document.createElement("h3");
nameHeading.textContent = user.name;
card.appendChild(nameHeading);
dataOutput.appendChild(card);
```

Every element — the card wrapper, the heading, the email paragraph, the
company paragraph — is created entirely in JavaScript using
`createElement()` and `appendChild()`. Nothing about the fetched data
exists in the HTML file. This means the page works correctly whether the
API returns one user or a hundred, and the structure is always built from
real data.

---

## JavaScript concepts I used (at least 5)

- **`localStorage.getItem / setItem`** — reads and writes a key-value
  pair that persists in the browser across sessions; used here to save
  the theme choice so `"dark"` or `"light"` is remembered after the page
  is closed and reopened
- **Boolean state toggle** — `isDark = !isDark` flips the value on every
  click; the `if/else` that follows reads the new value and decides which
  class to add or remove and what label to show on the button
- **`new Date()` and string formatting** — `getFullYear()`,
  `getMonth() + 1` (months are zero-indexed so 1 must be added),
  `getDate()`, and `padStart(2, "0")` (ensures single digit days/months
  like 5 become "05") combine to produce a consistently formatted date
  string without any library
- **`async/await` with `fetch()`** — the function is marked `async` so
  `await` can be used inside it; the first `await` pauses until the HTTP
  response headers arrive, the second `await response.json()` pauses
  again until the full response body is parsed — both pauses are
  non-blocking to the rest of the page
- **`document.createElement()` and `appendChild()`** — every node in the
  result card is built programmatically; `createElement` creates a detached
  element in memory, properties like `textContent` and `className` are set
  on it, then `appendChild` attaches it to the live document in the correct
  position
- **`throw new Error()`** — manually creating and throwing an Error object
  inside the `if (!response.ok)` check causes the catch block to handle
  HTTP failures the same way it handles network failures, giving one
  consistent error handling path for all failure types

## One thing I struggled with

- Understanding that `await response.json()` is also asynchronous and
  needs its own `await`. I initially thought once the fetch was done all
  the data was available, but `response.json()` is a separate async
  operation that reads and parses the response body stream — the headers
  arrive first and then the body follows, so without `await` the variable
  would hold an unresolved Promise instead of the actual data object

## One improvement I want to do next

- Disable the "Load Data" button while the fetch is in progress and
  re-enable it after the `try/catch` completes — currently a user can
  click the button multiple times rapidly and fire several overlapping
  fetch requests that all try to update `dataOutput` at the same time;
  setting `btnLoadData.disabled = true` before the fetch and
  `btnLoadData.disabled = false` in a `finally` block would prevent
  this and give clearer feedback that loading is already happening
