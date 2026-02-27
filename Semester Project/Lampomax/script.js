const lampScene = document.querySelector(".lamp-scene");
const lampSwitch = document.getElementById("lampSwitch");
const toggleLampBtn = document.getElementById("toggleLampBtn");

function toggleLamp() {
  lampScene.classList.toggle("lamp-on");
  const isOn = lampScene.classList.contains("lamp-on");
  lampSwitch.setAttribute("aria-pressed", String(isOn));
}

lampSwitch.addEventListener("click", toggleLamp);
toggleLampBtn.addEventListener("click", toggleLamp);

// Optional: toggle with keyboard (Enter/Space)
lampSwitch.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleLamp();
  }
});
