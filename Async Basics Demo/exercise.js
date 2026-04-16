// Get references to UI elements
const output = document.getElementById("output");
const statusText = document.getElementById("status");

// Helper function to print text
function log(message) {
    output.textContent += message + "\n";
}

// Helper function to clear output
function clearOutput() {
    output.textContent = "";
}

// Helper function to update status
function setStatus(text) {
    statusText.textContent = "Status: " + text;
}

/* ==========================================================
   1) ASYNC TIMEOUT
   ========================================================== */

// This demonstrates that JavaScript does NOT wait.
// setTimeout schedules a task for later.
document.getElementById("btnTimeout").onclick = function () {

    clearOutput();
    log("Start");

    // PART B: Changed timeout from 2000 ms to 500 ms.
    // "End" still appears before "Timeout finished" because
    // setTimeout is non-blocking — JS schedules the callback
    // and immediately continues to the next line.
    setTimeout(function () {
        log("Timeout finished after 500 ms");
    }, 500);

    log("End");
};

/* ==========================================================
   2) ASYNC PROMISE
   ========================================================== */

// A Promise represents a value that will arrive in the future.
function waitOneSecond() {

    // We create and return a Promise object.
    return new Promise(function (resolve) {

        // PART C2: Changed waiting time from 1000 ms to 2000 ms.
        setTimeout(function () {
            // PART C1: Changed resolve message.
            resolve("Promise resolved after 1 second!");
        }, 2000);
    });
}

document.getElementById("btnPromise").onclick = function () {

    clearOutput();
    setStatus("Waiting (Promise)...");

    // .then() runs AFTER the Promise is completed.
    // It executes only once the Promise resolves — the page
    // stays interactive while it waits.
    waitOneSecond().then(function (result) {
        log(result);
        setStatus("Idle");
    });
};

/* ==========================================================
   3) ASYNC / AWAIT
   ========================================================== */

// async/await is a modern way to work with Promises.
// It makes asynchronous code look more readable.

async function runAwaitExample() {

    clearOutput();
    // PART D1: Changed status text.
    setStatus("Please wait, async/await running...");

    // PART D2: Added log BEFORE await.
    log("Before await");

    // 'await' pauses this function until the Promise resolves.
    // It does NOT freeze the browser.
    const result = await waitOneSecond();

    // PART D2: Added log AFTER await.
    log("After await");

    log(result);
    setStatus("Idle");
}

document.getElementById("btnAwait").onclick = runAwaitExample;

/* ==========================================================
   4) ASYNC FETCH (REAL WORLD)
   ========================================================== */

// Fetch is used to get data from the internet (API).
// It returns a Promise.

async function runFetchExample() {

    clearOutput();
    setStatus("Loading from API...");

    try {

        // PART E2: URL changed to /todos/999999 to force an HTTP error.
        // Change back to /todos/1 to get a successful response.
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/999999"
        );

        // Check if HTTP status is OK (200–299).
        // We must check response.ok because fetch() only throws
        // on network failure — HTTP 4xx/5xx errors still resolve
        // the Promise, so without this check they would be silently ignored.
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Convert response body to JSON (this is also async!)
        const data = await response.json();

        // PART E1: Changed output to show data.id and data.title.
        log("ID: " + data.id);
        log("Title: " + data.title);

    } catch (error) {

        // This runs if network fails or we throw manually
        log("Error: " + error.message);

    } finally {

        // finally always runs (success or error)
        setStatus("Idle");
    }
}

document.getElementById("btnFetch").onclick = runFetchExample;
