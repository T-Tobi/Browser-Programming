````md
# Lecture 07 – Weather Dashboard

## What I built

A fully interactive weather dashboard that fetches live weather data from the
Open-Meteo public API for three Finnish cities — Kuopio, Helsinki, and Oulu.
The user clicks a city button and the page instantly updates with real
temperature, wind speed, and time data pulled from the API at that moment.
The background colour also changes based on whether the temperature is below
or above zero, connecting live data to a visual UI response.

---

## Files

| File                     | Purpose                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `weather-dashboard.html` | Page structure — buttons, weather display box, output area                    |
| `weather-dashboard.js`   | All fetch logic, DOM updates, error handling                                  |
| `style.css`              | Shared stylesheet including `.weather-box`, `.cold`, `.mild`, `.button-group` |

---

## How it works — step by step

**1. User clicks a city button**
Each button has an `onclick` handler that calls `loadWeatherByCity()` with
the city's name, latitude, and longitude passed as arguments:

```js
document.getElementById("btnKuopio").onclick = function () {
  loadWeatherByCity("Kuopio", 62.8924, 27.677);
};
```

**2. URL is built dynamically**
The coordinates are injected into the API URL string so the same function
works for any city without duplicating code:

```js
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=" +
  latitude +
  "&longitude=" +
  longitude +
  "&current=temperature_2m,wind_speed_10m";
```

**3. fetch() sends the request**

```js
const response = await fetch(url);
```

The browser sends an HTTP GET request to the Open-Meteo server and waits
for a response. `await` pauses the function here without freezing the page.

**4. response.ok is checked**

```js
if (!response.ok) {
  throw new Error("HTTP Error: " + response.status);
}
```

If the server returns a 4xx or 5xx status, this throws an error that jumps
straight to the `catch` block. Without this check, a failed request would
silently continue with broken data.

**5. JSON is parsed**

```js
const data = await response.json();
```

The raw response body text is parsed into a JavaScript object. This is also
async because the browser reads the response body as a stream.

**6. Nested fields are accessed**

```js
const temperature = data.current.temperature_2m;
const wind = data.current.wind_speed_10m;
const time = data.current.time;
```

All three values are nested inside `data.current` — you cannot access them
as `data.temperature_2m` directly; you must go through the `current` object first.

**7. DOM is updated**

```js
cityText.textContent = cityName;
temperatureText.textContent = Math.round(temperature) + " °C";
windText.textContent = wind + " km/h";
timeText.textContent = time;
```

Each `<span>` on the page is updated with real data. `Math.round()` removes
decimal places from the temperature for cleaner display.

**8. Background changes based on temperature**

```js
if (temperature < 0) {
  weatherBox.className = "weather-box cold";
} else {
  weatherBox.className = "weather-box mild";
}
```

The CSS class on the weather box is replaced at runtime — `cold` applies a
blue tint, `mild` applies a green tint. This is data driving visual output.

**9. Console output is also printed**

```js
log("City: " + cityName);
log("Temperature: " + Math.round(temperature) + " °C");
```

The `log()` helper appends text to the `<pre>` element below the box so the
raw output is visible alongside the formatted display.

**10. catch handles all errors**

```js
catch (error) {
    log("Error: " + error.message)
}
```

Both network failures and manually thrown HTTP errors land here. The user
sees a readable message instead of the page crashing silently.

---

## Key concepts learned

### Why is this page called dynamic?

The page content is not written in the HTML file — it is empty when loaded.
Everything visible in the weather box (city, temperature, wind, time, background
colour) is inserted by JavaScript at runtime based on data received from an
external server. It changes every time a button is clicked and reflects real
current conditions, not anything hardcoded.

### What does the API give us?

The Open-Meteo API returns a JSON object containing current weather readings
for the requested coordinates. Specifically it provides `temperature_2m`
(temperature measured 2 metres above ground), `wind_speed_10m` (wind speed
10 metres above ground), and `time` (the timestamp of the reading). These
values are different every time the request is made because they reflect
live atmospheric conditions.

### Why is JSON useful here?

JSON gives the data a predictable structure that JavaScript can immediately
work with after parsing. Instead of receiving raw text and trying to find
values inside a string, `response.json()` converts the response into a
proper JavaScript object where values are accessed by their exact key names
like `data.current.temperature_2m`. It is also human-readable, which makes
debugging easy — you can paste it into any browser console or JSON viewer
and immediately understand the structure.

### Why is one reusable function better than three separate functions?

If each city had its own `loadWeatherKuopio()`, `loadWeatherHelsinki()`, and
`loadWeatherOulu()` function, the fetch logic, error handling, DOM update
code, and logging would be repeated three times identically. Any bug fix or
change (like adding the time field) would need to be made in three places.
`loadWeatherByCity(cityName, latitude, longitude)` contains the logic once
— adding a fourth city only requires one new button and one new `onclick`
line, not a whole new function. This is the DRY principle: Don't Repeat Yourself.

---

## Concepts I used

**`async/await`**
The function is marked `async` so `await` can be used inside it. The two
`await` calls — one for `fetch()` and one for `response.json()` — pause
execution at each point until the Promise resolves, making async code read
like normal sequential code without blocking the browser.

**`fetch()` with a dynamic URL**
The URL is constructed by concatenating the latitude and longitude passed
into the function, making a single `fetch()` call reusable for any set of
coordinates rather than hardcoding a city-specific URL each time.

**`response.ok` check**
`fetch()` only throws automatically on total network failure. An HTTP 404
or 500 still resolves the Promise successfully. Checking `response.ok` and
throwing manually ensures HTTP errors are caught and handled the same way
as network errors.

**`try/catch`**
Wraps the entire fetch operation so any failure — network down, bad status,
malformed JSON — is caught in one place and displayed as a readable message
rather than an unhandled error crashing the function silently.

**Nested JSON access**
`data.current.temperature_2m` demonstrates two levels of depth — `data`
is the root object, `current` is a nested object inside it, and
`temperature_2m` is a field on that nested object. Real API responses are
almost always nested like this.

**Dynamic class switching**
`weatherBox.className = "weather-box cold"` replaces the entire class
attribute at runtime. CSS defines what `cold` and `mild` look like; JavaScript
decides which one applies based on the live temperature value. This is the
separation of concerns: CSS handles appearance, JavaScript handles logic.

**`Math.round()`**
The API returns temperature as a decimal like `3.4` or `-1.7`. Rounding
to a whole number before displaying it makes the UI cleaner and more
readable without losing meaningful precision for a general weather display.

---

## Extension tasks completed

| Task                   | What was done                                                            |
| ---------------------- | ------------------------------------------------------------------------ |
| Multiple cities        | Three buttons each call `loadWeatherByCity()` with different coordinates |
| Show time of data      | `data.current.time` is read and displayed in the `<span id="time">`      |
| Temperature background | `cold` class applied below 0°C, `mild` class applied at 0°C and above    |

---

## One thing I struggled with

Understanding that `data.current.temperature_2m` requires two levels of
access — I initially tried `data.temperature_2m` and got `undefined`. The
fix was to `console.log(data)` and look at the actual JSON structure in the
browser console, which clearly showed that `temperature_2m` sits inside a
`current` object, not directly on the root. This taught me to always inspect
the full JSON before writing access paths.

## One improvement I want to do next

Add a loading state to the weather box while the fetch is in progress —
currently the old data stays visible until the new response arrives, which
could confuse the user into thinking the button did not work. Setting the
city span to "Loading..." and disabling all three buttons during the `await`
then re-enabling them after the `try/catch` completes would give clear
feedback that a request is in progress.
````
