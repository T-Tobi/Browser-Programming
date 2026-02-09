// ==========================
// Console + State
// ==========================
console.log("Page loaded successfully");

let isDarkMode = false; // state variable
const contactEmail = "tobi8ashaolu@gmail.com"; // constant variable

// ==========================
// Functions
// ==========================
function setTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode");

  console.log("Theme changed. Dark mode:", isDarkMode);
}

function showContact() {
  console.log("Contact button clicked");
  alert("You can reach me at: " + contactEmail);
}

// ==========================
// Events
// ==========================
document.getElementById("themeBtn").addEventListener("click", setTheme);
document.getElementById("contactBtn").addEventListener("click", showContact);
