import { Character } from "./character.js";
import { Projectile } from "./projectile.js";
// import { updateDOM } from "./updateDOM";

// const fireBall = { image: "url", class: "projectile" };
// const Luffy = { name: "Luffy", class: "character" };

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
// let maxObj = 10;
// let projSpeed = 200;
// let projStack = 0;
let start = null;
let timeElapsed = 0;
let projectileTimer = null;
const projectileArray = [];
let levelIncrease = 4;
let timeDecrease = 1;

function updateTimer(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  if (progress > 1000) {
    timeDisplay.innerHTML = `Time Elapsed: ${timeElapsed++}s`;
    start = null;
  }
}

function createProjectiles(timestamp) {
  if (!projectileTimer) projectileTimer = timestamp;
  var progress = timestamp - projectileTimer;
  if (progress > 1000 * timeDecrease) {
    timeDecrease -= 0.1;
    let projectile = new Projectile("yo", projectilesScene);
    projectileArray.push(projectile);
    projectileTimer = null;
  }
  // levelIncrease *= 2;
}

function drawProjectiles(projectiles) {
  for (let projectile of projectiles)
    projectile.drawElement(() => {
      projectile.deleteElement(projectilesScene);
      projectileArray.splice(projectileArray.indexOf(projectile), 1);
    });
}

function gameLoop(timestamp) {
  character.move(keyState);
  character.drawElement();
  createProjectiles(timestamp);
  drawProjectiles(projectileArray);
  updateTimer(timestamp);
  // updateDOMElements(luffy, projectilesArray);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
