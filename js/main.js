import { Character } from "./character.js";
import { Projectile } from "./projectile.js";
// import { updateDOM } from "./updateDOM";

//Event Listener
const LEFTARROW = 37;
const RIGHTARROW = 39;
const keyState = {};

window.onkeydown = e => (keyState[e.keyCode] = true);
window.onkeyup = e => (keyState[e.keyCode] = false);

//Calling Dom Elements
const scene = document.getElementById("scene");
const characterScene = document.getElementById("char-grid");
const projectilesScene = document.getElementById("proj-grid");
const timeDisplay = document.getElementById("time");
const defeatDisplay = document.getElementById("defeat");

//Creating DOM ELements;
const character = new Character({ x: 2, y: 33 }, characterScene);
// let hit = false;
// const projectilesArray = [];
// let maxObj = 10;
// let projSpeed = 200;
// let projStack = 0;
let timeElapsed = null;

function updateTimer(timestamp) {
  let time = 0;
  const timeInterval = setInterval(() => {
    timeDisplay.innerHTML = `Time Elapsed: ${timeElapsed++}s`;
    if (timeElapsed - time > 0) {
      time++;
    }
  }, 1000);
}
updateTimer();

function gameLoop(timestamp) {
  character.move(keyState);
  character.drawElement(characterScene);
  // updateProjectile();
  // createProjectile();
  // updateTimer(timestamp);
  // updateDOMElements(luffy, projectilesArray);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
