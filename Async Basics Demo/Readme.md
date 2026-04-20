# Lecture 05 – Async & Fetch

## What I implemented this lecture

- Demonstrated how JavaScript's non-blocking nature works by using `setTimeout` to
  schedule a delayed task and observing that "End" prints before "Timeout finished" —
  proving that JavaScript does not wait for slow operations before moving to the next line
- Built and consumed Promises manually — creating a `waitOneSecond()` function that
  wraps a `setTimeout` inside a `new Promise()` and resolves it after a delay, then
  chaining `.then()` to run code only once the Promise fulfilled while keeping the page
  fully interactive during the wait
- Used `async/await` to write the same asynchronous logic in a cleaner, top-to-bottom
  readable style — including `log()` calls before and after the `await` to visually prove
  where the function pauses and resumes without freezing the browser
- Made a real-world API call using the `fetch()` function to retrieve data from
  `jsonplaceholder.typicode.com`, handled both success and HTTP error cases correctly,
  and used `try/catch/finally` to ensure the status indicator always resets regardless
  of whether the request succeeded or failed

## JavaScript concepts I used (at least 5)

- **`setTimeout` and non-blocking execution** — `setTimeout` schedules a callback for
  later and immediately hands control back to JavaScript, which is why "End" logs before
  "Timeout finished" — this is the core demonstration of the JavaScript event loop: slow
  tasks are pushed to the side and the rest of the code continues running
- **Promises** — `new Promise(function(resolve) { ... })` creates an object that
  represents a future value; calling `resolve()` inside the timeout fulfils the Promise
  and triggers any `.then()` handlers chained onto it — this is the foundation that
  `async/await` is built on top of
- **`.then()` chaining** — `.then(function(result) { ... })` registers a callback that
  only runs once the Promise resolves, passing the resolved value as its argument;
  unlike a callback passed directly to `setTimeout`, this keeps the code flatter and
  more readable when dealing with sequential async steps
- **`async/await`** — marking a function with `async` allows `await` to be used inside
  it; `await` pauses that specific function at the point it appears and waits for the
  Promise to resolve before continuing to the next line — crucially, it does not block
  the browser or other code running outside the function
- **`fetch()` and `response.ok`** — `fetch()` returns a Promise that resolves even on
  HTTP errors like 404 or 500; it only rejects on a complete network failure, which
  means without explicitly checking `response.ok` and throwing manually, a failed API
  call would appear to succeed silently — this is one of the most common bugs in
  real-world fetch usage
- **`try/catch/finally`** — wrapping async code in `try` catches both network failures
  (which `fetch` throws automatically) and manually thrown errors (like the HTTP error
  check); `catch` handles the error gracefully by logging it to the output; `finally`
  runs unconditionally after either outcome — used here to always reset the status text
  back to "Idle" so the UI never gets stuck showing "Loading..."

## One thing I struggled with

- Understanding why `fetch()` does not throw an error on a 404 or 500 response — I
  expected that getting a bad response from the server would automatically go to the
  `catch` block, but fetch only rejects its Promise if there is a network-level failure
  (like no internet connection or the server not responding at all); an HTTP error is
  still technically a valid response that arrived successfully, so `response.ok` must be
  checked manually and an error thrown explicitly to trigger the `catch` — the `/todos/999999`
  URL in the code was specifically changed to test and observe this exact behaviour

## One improvement I want to do next

- Add a visible loading spinner or disabled state on the buttons while an async
  operation is in progress — currently the status text updates, but a user could click
  multiple buttons rapidly and trigger overlapping fetch calls; disabling the buttons
  during the `await` and re-enabling them in `finally` would prevent duplicate requests
  and give clearer visual feedback that something is happening in the background
