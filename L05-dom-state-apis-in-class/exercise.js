console.log("JS connected ✅");

/* =========================================================
   L05 — DOM • State • Browser APIs
   =========================================================
   Rules:
   - Do NOT change HTML ids
   - No external libraries
   - No console errors
   ========================================================= */


/* =========================================================
   1) DOM EASY — Live Character Counter
   ---------------------------------------------------------
   On every input event:
     - calculate current length and remaining characters
     - update the msgStats paragraph
     - if remaining < 10, show a visual warning (red colour)
     - otherwise show normal colour
   ========================================================= */

const msgInput = document.getElementById("msgInput");
const msgStats  = document.getElementById("msgStats");

// Set a max length on the input so the browser enforces it too
msgInput.maxLength = 50;

msgInput.addEventListener("input", function () {
  const len       = msgInput.value.length;   // how many chars typed so far
  const remaining = 50 - len;               // how many chars are left

  // Update the status paragraph
  msgStats.innerText = `Length: ${len} | Remaining: ${remaining}`;

  // Visual warning when almost full
  if (remaining < 10) {
    msgStats.style.color  = "crimson";
    msgStats.style.fontWeight = "bold";
  } else {
    msgStats.style.color  = "";        // reset to default
    msgStats.style.fontWeight = "";
  }
});

// Initialise the stats text on page load (input is empty at start)
msgStats.innerText = "Length: 0 | Remaining: 50";


/* =========================================================
   2) DOM MEDIUM — Toggle List (Event Delegation)
   ---------------------------------------------------------
   - Add items as <li> elements containing a <span> (text)
     and a <button data-action="remove"> (X button)
   - ONE click handler lives on the <ul>:
       • clicking the X button  → remove the parent <li>
       • clicking anywhere else → toggle "done" class on <li>
   - After every change, call updateListStats()
   ========================================================= */

const itemInput    = document.getElementById("itemInput");
const btnAddItem   = document.getElementById("btnAddItem");
const btnClearItems = document.getElementById("btnClearItems");
const itemList     = document.getElementById("itemList");
const listStats    = document.getElementById("listStats");

let nextId = 1; // unique id counter for each list item

/** Counts all items and done items, then updates the stats paragraph. */
function updateListStats() {
  const total = itemList.querySelectorAll("li").length;
  const done  = itemList.querySelectorAll("li.done").length;
  listStats.innerText = `Items: ${total} | Done: ${done}`;
}

/** Creates and appends a new <li> for the given text string. */
btnAddItem.onclick = function () {
  const text = itemInput.value.trim();
  if (text === "") return; // ignore empty input

  // Build the list item
  const li = document.createElement("li");
  li.dataset.id = String(nextId); // store unique id as data attribute

  // Text part
  const span = document.createElement("span");
  span.textContent = text;

  // Remove button
  const btnX = document.createElement("button");
  btnX.textContent = "✕";
  btnX.dataset.action = "remove"; // used by the event-delegation handler

  li.appendChild(span);
  li.appendChild(btnX);
  itemList.appendChild(li);

  // Reset and update
  itemInput.value = "";
  nextId++;
  updateListStats();
};

/** Removes all items from the list at once. */
btnClearItems.onclick = function () {
  itemList.innerHTML = "";
  updateListStats();
};

/*
  Single delegated listener on the <ul>.
  e.target is the element the user actually clicked.
  e.target.closest("li") walks up the DOM to find the
  containing <li>, even if the user clicked the <span> or
  the <button>.
*/
itemList.onclick = function (e) {
  const li = e.target.closest("li");
  if (!li) return; // click outside any <li>

  if (e.target.dataset.action === "remove") {
    // Clicked the X button → delete the item
    li.remove();
  } else {
    // Clicked anywhere else on the row → toggle done styling
    li.classList.toggle("done");
  }

  updateListStats();
};

// Initialise stats on page load (list is empty)
updateListStats();


/* =========================================================
   3) STATE EASY — Counter (State → Render)
   ---------------------------------------------------------
   - All state lives in counterState
   - Buttons ONLY mutate state, then call renderCounter()
   - renderCounter() is the ONLY place that touches the DOM
   ========================================================= */

const btnMinus  = document.getElementById("btnMinus");
const btnPlus   = document.getElementById("btnPlus");
const btnZero   = document.getElementById("btnZero");
const countOut  = document.getElementById("countOut");
const parityOut = document.getElementById("parityOut");

// The single source of truth
const counterState = { count: 0 };

/** Reads counterState and updates both output paragraphs. */
function renderCounter() {
  countOut.innerText  = `Count: ${counterState.count}`;
  parityOut.innerText = `Parity: ${counterState.count % 2 === 0 ? "EVEN" : "ODD"}`;
}

btnPlus.onclick = function () {
  counterState.count++; // mutate state
  renderCounter();      // re-render
};

btnMinus.onclick = function () {
  counterState.count--;
  renderCounter();
};

btnZero.onclick = function () {
  counterState.count = 0;
  renderCounter();
};

// Show initial state on page load
renderCounter();


/* =========================================================
   4) STATE MEDIUM — Mini Cart (Reducer-like pattern)
   ---------------------------------------------------------
   State:  cartState.items  — array of { name, price }
   Actions:
     { type: "ADD",         item: { name, price } }
     { type: "REMOVE_LAST" }
     { type: "CLEAR" }

   dispatch(action)  →  mutates state  →  calls renderCart()
   renderCart()  →  derives everything from state  →  updates DOM
   ========================================================= */

const btnAddApple   = document.getElementById("btnAddApple");
const btnAddBanana  = document.getElementById("btnAddBanana");
const btnRemoveLast = document.getElementById("btnRemoveLast");
const btnCartClear  = document.getElementById("btnCartClear");
const cartOut       = document.getElementById("cartOut");
const cartTotals    = document.getElementById("cartTotals");

// Single source of truth for the cart
const cartState = { items: [] };

/**
 * Applies one action to cartState, then re-renders.
 * Works like a Redux-style reducer but kept simple.
 * @param {{ type: string, item?: {name:string, price:number} }} action
 */
function dispatch(action) {
  if (action.type === "ADD") {
    // Push a copy so the caller can't accidentally mutate the array
    cartState.items.push({ name: action.item.name, price: action.item.price });

  } else if (action.type === "REMOVE_LAST") {
    if (cartState.items.length > 0) {
      cartState.items.pop(); // remove the last element
    }

  } else if (action.type === "CLEAR") {
    cartState.items = []; // replace with empty array
  }

  renderCart(); // always re-render after any state change
}

/** Derives display values from cartState and updates the DOM. */
function renderCart() {
  // Build comma-separated list of item names
  const names    = cartState.items.map(function (it) { return it.name; });
  const listText = names.length === 0 ? "(empty)" : names.join(", ");

  // Sum all prices (derived value — never stored in state)
  let total = 0;
  for (const it of cartState.items) {
    total += it.price;
  }

  cartOut.innerText    = `Cart: ${listText}`;
  cartTotals.innerText = `Items: ${cartState.items.length} | Total: €${total}`;
}

btnAddApple.onclick = function () {
  dispatch({ type: "ADD", item: { name: "Apple", price: 2 } });
};

btnAddBanana.onclick = function () {
  dispatch({ type: "ADD", item: { name: "Banana", price: 1 } });
};

btnRemoveLast.onclick = function () {
  dispatch({ type: "REMOVE_LAST" });
};

btnCartClear.onclick = function () {
  dispatch({ type: "CLEAR" });
};

// Show initial (empty) cart on page load
renderCart();


/* =========================================================
   5) Browser API EASY — Notes (localStorage, synchronous)
   ---------------------------------------------------------
   - Save:  localStorage.setItem(key, value)
   - Load:  localStorage.getItem(key)   → returns null if missing
   - Clear: localStorage.removeItem(key)
   - Handle null / empty string gracefully in renderNote()
   ========================================================= */

const noteInput   = document.getElementById("noteInput");
const btnSaveNote = document.getElementById("btnSaveNote");
const btnLoadNote = document.getElementById("btnLoadNote");
const btnClearNote = document.getElementById("btnClearNote");
const noteOut     = document.getElementById("noteOut");

const NOTE_KEY = "L05_NOTE"; // the localStorage key name

/**
 * Updates the noteOut paragraph.
 * @param {string|null} saved  — the stored value, or null if nothing is saved
 */
function renderNote(saved) {
  if (saved === null || saved === "") {
    // Nothing stored yet (or was cleared)
    noteOut.innerText = "Saved note: (none)";
  } else {
    noteOut.innerText = `Saved note: ${saved}`;
  }
}

btnSaveNote.onclick = function () {
  const text = noteInput.value.trim();
  localStorage.setItem(NOTE_KEY, text); // persist to browser storage
  renderNote(text);
  noteInput.value = ""; // clear the input after saving
};

btnLoadNote.onclick = function () {
  const saved = localStorage.getItem(NOTE_KEY); // returns null if key absent
  renderNote(saved);
};

btnClearNote.onclick = function () {
  localStorage.removeItem(NOTE_KEY); // delete the key entirely
  renderNote(null);
};

// On page load: restore any previously saved note
renderNote(localStorage.getItem(NOTE_KEY));


/* =========================================================
   6) Browser API MEDIUM — Geolocation (callback-based)
   ---------------------------------------------------------
   navigator.geolocation.getCurrentPosition(success, error, options)
   - success callback receives a GeolocationPosition object
   - error callback receives a GeolocationPositionError object
       err.code === 1  → permission denied
       err.code === 2  → position unavailable
       err.code === 3  → timeout
   - Works on localhost or HTTPS (browser security requirement)
   ========================================================= */

const btnGetLocation   = document.getElementById("btnGetLocation");
const btnClearLocation = document.getElementById("btnClearLocation");
const geoStatus        = document.getElementById("geoStatus");
const geoOut           = document.getElementById("geoOut");

/** Resets both geo output elements to their placeholder text. */
function clearGeoUI() {
  geoStatus.innerText = "Status: ...";
  geoOut.innerText    = "...";
}

btnGetLocation.onclick = function () {
  // Guard: Geolocation API might not exist in very old browsers
  if (!("geolocation" in navigator)) {
    geoStatus.innerText = "Status: Error — Geolocation not supported by this browser";
    geoOut.innerText    = "";
    return;
  }

  // Tell the user we're waiting for the browser permission prompt
  geoStatus.innerText = "Status: Requesting permission…";
  geoOut.innerText    = "";

  // Options passed to getCurrentPosition
  const options = {
    enableHighAccuracy: true, // use GPS if available (slower but more precise)
    timeout:            8000, // give up after 8 seconds
    maximumAge:         0,    // never use a cached position
  };

  navigator.geolocation.getCurrentPosition(
    // ── success callback ──────────────────────────────────
    function success(pos) {
      const { latitude, longitude, accuracy } = pos.coords;

      geoStatus.innerText = "Status: OK ✅";
      geoOut.innerText =
        `latitude:  ${latitude}\n` +
        `longitude: ${longitude}\n` +
        `accuracy:  ${accuracy} metres\n` +
        `timestamp: ${new Date(pos.timestamp).toISOString()}`;
    },

    // ── error callback ────────────────────────────────────
    function error(err) {
      // Translate numeric error codes into human-readable messages
      let msg;
      if      (err.code === 1) msg = "Permission denied — please allow location access";
      else if (err.code === 2) msg = "Position unavailable — could not determine location";
      else if (err.code === 3) msg = "Timeout — request took too long";
      else                     msg = err.message; // fallback

      geoStatus.innerText = `Status: Error — ${msg}`;
      geoOut.innerText    = "";
    },

    options
  );
};

btnClearLocation.onclick = function () {
  clearGeoUI();
};

// Show placeholder text on page load
clearGeoUI();
