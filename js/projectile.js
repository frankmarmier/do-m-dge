import { randomPosition } from "./utils.js";

export class Projectile {
  constructor(image, parentNode) {
    this.image = image;
    this.position = this.setPosition();
    this.domElement = null;
    this.intervalId = null;
    this.createElement(parentNode);
    this.applyGravity();
  }

  setPosition = () => {
    return {
      x: randomPosition(99),
      y: 1
    };
  };

  createElement(parentNode) {
    const element = document.createElement("div");
    element.className = "projectile";
    this.domElement = element;
    parentNode.appendChild(this.domElement);
  }

  drawElement = callback => {
    this.domElement.style.gridColumn = `${this.position.x}`;
    this.domElement.style.gridRow = `${this.position.y}`;
    if (this.position.y > 50) callback();
  };

  deleteElement = parentNode => {
    parentNode.removeChild(this.domElement);
    delete this;
  };

  applyGravity = () => {
    this.position.y++;
    requestAnimationFrame(this.applyGravity);
    // this.intervalId = setInterval(() => {
    //   this.position.y = this.position.y + 1;
    //   this.domElement.style.gridRow = `${this.position.y} / span 2`;
    // }, 20);
  };
}
