export class Character {
  constructor(position, parentNode) {
    // Position is layed out such as : {x: Horizontal position; y: Vertical Position}
    this.currentPosition = position;
    this.animationClasses = {
      idle: "characterIdle",
      running: "characterRunning",
      jumping: "characterJumping",
      reversed: "reversed"
    };
    this.currentAnimation = "characterIdle";
    this.lives = 3;
    this.isAirborne = false;
    this.isRunning = false;
    this.startingAnimation = 10;
    this.createElement(parentNode);
  }

  getAnimation = keyState => {
    if (keyState[39] || (keyState[37] && !this.isAirborne)) {
      this.currentAnimation = this.animationClasses.running;
    }
    if ((this.isRunning && this.isAirborne) || this.isAirborne) {
      this.currentAnimation = this.animationClasses.jumping;
    }
    if (!keyState[37] && !keyState[39] && !this.isAirborne) {
      this.currentAnimation = this.animationClasses.idle;
    }
  };

  createElement = parentNode => {
    const element = document.createElement("div");
    element.className = this.currentAnimation;
    this.domElement = element;
    parentNode.appendChild(this.domElement);
  };

  drawElement = () => {
    this.domElement.className = this.currentAnimation;
    this.domElement.style.gridColumn = `${this.currentPosition.x}`;
    this.domElement.style.gridRow = `${this.currentPosition.y}`;
  };

  jump = () => {
    this.isAirborne = true;
    let height = 0;
    this.currentAnimation = this.animationClasses.jumping;
    const intervalId = setInterval(() => {
      if (height > 15) {
        clearInterval(intervalId);
        this.fall();
      }
      this.currentPosition = {
        x: this.currentPosition.x,
        y: this.currentPosition.y - 1
      };
      height++;
    }, 11);
  };

  fall = (height = 0) => {
    if (height > 16) {
      window.cancelAnimationFrame(this.fallReq);
      this.isAirborne = false;
      return;
    }
    this.currentPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y + 1
    };
    height++;
    this.fallReq = requestAnimationFrame(timestamp => this.fall(height));
  };

  move = keyState => {
    if (keyState["37"] && this.currentPosition.x > 0) {
      this.currentPosition.x -= 0.5;
      this.currentAnimation = this.animationClasses.reversed;
      this.isRunning = true;
    }
    if (keyState["39"] && this.currentPosition.x < 99) {
      this.currentPosition.x += 0.5;
      this.currentAnimation = this.animationClasses.running;
      this.isRunning = true;
    }
    if (keyState["32"] && !this.isAirborne) this.jump();
    if (!this.isRunning) this.currentAnimation = this.animationClasses.idle;
    if (!keyState["37"] && !keyState["39"] && !this.isAirborne) {
      this.currentAnimation = this.animationClasses.idle;
    }
  };

  getPosition = () => {
    return this.currentPosition;
  };
}
