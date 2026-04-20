````md
# Lecture 07 – Data Formats & APIs

## What I implemented this lecture

- Fetched a list of 10 real users from a live REST API using `fetch()` and `async/await`,
  parsed the JSON response, and iterated over the array to extract and display each
  user's name, email, and city
- Accessed nested JSON fields — `user.address.city` goes two levels deep into the
  response object, demonstrating that JSON is not always flat and real API data
  frequently has objects within objects
- Displayed results in two places simultaneously — in a `<pre>` console output area
  using a `log()` helper function, and in a live `<ul>` list on the webpage by
  dynamically creating `<li>` elements with `document.createElement()` and appending
  them to the DOM
- Implemented proper error handling with `try/catch` and an explicit `response.ok`
  check so both network failures and HTTP error status codes are caught and reported
  cleanly rather than crashing silently

## Technical requirements met

### Fetching from a real REST API

```js
const response = await fetch("https://jsonplaceholder.typicode.com/users");
```

`jsonplaceholder.typicode.com` is a real public API that returns realistic
fake data. This is a genuine HTTP request to an external server — not
local data — which is why `async/await` is required to wait for the
response to arrive before processing it.

---

### Working with JSON objects

```js
const users = await response.json();
```

`response.json()` reads the response body and parses it from a raw JSON
string into a real JavaScript array of objects. After this line, `users`
is a standard JS array and each item inside it is a plain object whose
fields can be accessed with dot notation like any other variable.

---

### Accessing nested fields

```js
const city = user.address.city;
```

Each user object contains an `address` field which is itself an object
containing `street`, `suite`, `city`, and `zipcode`. Accessing `city`
directly as `user.city` would return `undefined` because it is one level
deeper — you must go through `user.address` first. This is the core
skill of working with real API responses where data is grouped into
logical sub-objects.

---

### `fetch()` and `response.json()`

Both are asynchronous operations and both need `await`:

- First `await` — waits for the server to respond and headers to arrive
- Second `await` — waits for the full response body to be read and parsed
  into JavaScript

Without the second `await`, `users` would be an unresolved Promise
instead of the actual array, and `users.forEach` would fail immediately.

---

### Displaying formatted output

**Console area:**

```js
log(name + " - " + email + " - " + city);
```

**Webpage list:**

```js
const li = document.createElement("li");
li.textContent = name + " - " + email + " - " + city;
list.appendChild(li);
```

Both happen inside the same `forEach` loop so each user is written to
both outputs in one pass. The `li` elements are created fresh each time
rather than injecting raw HTML strings, which is safer and avoids
potential XSS issues if the data ever contained HTML characters.

---

## JavaScript concepts I used (at least 5)

- **`async/await`** — the function is marked `async` so `await` can
  pause it at each Promise without blocking the browser; both the fetch
  call and the `.json()` call are awaited because both take time and
  return Promises — skipping either `await` would give a Promise object
  instead of usable data
- **`response.ok` check** — `fetch()` resolves its Promise even when the
  server returns a 404 or 500 status code; only a complete network
  failure causes an automatic throw; checking `response.ok` and throwing
  manually closes that gap so HTTP errors are handled the same way as
  network errors inside the single `catch` block
- **`Array.forEach()`** — iterates over every user object in the array
  and runs the same function for each one; the user object is passed in
  automatically as the argument, giving access to all its fields on each
  iteration without needing index-based access like `users[0]`, `users[1]`
- **Destructuring nested objects** — `user.address.city` chains two
  property accesses together; `user.address` returns the nested address
  object, then `.city` accesses the city field within it — this pattern
  applies to any depth of nesting in real API responses
- **`document.createElement()` and `appendChild()`** — creates a new
  `<li>` node in memory, sets its text content to the formatted string,
  then attaches it to the existing `<ul>` element in the live document;
  this is fully dynamic — the HTML file contains an empty list and
  JavaScript populates it entirely at runtime
- **`clearOutput()`** — resets both the console area (`textContent = ""`)
  and the list (`innerHTML = ""`) before each new fetch so repeated
  button clicks do not stack duplicate results on top of previous ones

## One thing I struggled with

- Understanding why `user.address.city` works but `user.city` returns
  `undefined`. I initially tried to access city directly on the user
  object and got undefined, which was confusing because name and email
  worked fine at the top level. Looking at the raw JSON in the browser's
  Network tab showed that address is a separate nested object — the
  fields are not all at the same level. This taught me to always inspect
  the actual JSON structure before writing the access path, either by
  logging the full object with `console.log(user)` or checking the
  Network tab response body

## One improvement I want to do next

- Display more of the nested data — each user also has a `company` object
  with `name`, `catchPhrase`, and `bs`, and a `geo` object inside
  `address` with `lat` and `lng` coordinates; the current output only
  shows three fields but the full response contains much richer data that
  could be formatted into a proper card layout with all fields labelled,
  making the output more useful and demonstrating deeper nested access
````
