import { randomPosition } from "./utils.js";

export class Projectile {
  constructor(image) {
    this.image = image;
    this.position = null;
    this.domElement = null;
    this.intervalId = null;
  }
  createProjectileElement(parentNode) {
    let randomX = randomPosition(99);
    this.position = { x: randomX, y: 1 };
  }

  positionElement = () => {
    this.domElement.style.gridRow = `${this.position.y} / span 2 `;
    this.domElement.style.gridColumn = `${this.position.x} / span 2`;
  };

  createElement(parentNode) {
    const element = document.createElement("div");
    element.classList.add("projectile");
    this.domElement = element;
    parentNode.appendChild(this.domElement);
  }

  getPosition() {
    return this.position;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  deleteElement = parentNode => {
    parentNode.removeChild(this.domElement);
    delete this;
  };

  applyGravity() {
    this.intervalId = setInterval(() => {
      this.position.y = this.position.y + 1;
      this.domElement.style.gridRow = `${this.position.y} / span 2`;
    }, 20);
  }
}
