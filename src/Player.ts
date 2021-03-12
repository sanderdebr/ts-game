import Entity from "./Entity";
import Keyboard from "./Keyboard";

export default class Player extends Entity {
  // Constructor
  constructor(image: string, ctxBoundries: DOMRect) {
    super(image, ctxBoundries);
    this.image.src = image;
    this.speed = 5;
  }

  // Public methods
  public isTouchingTop() {
    return this.pos.y <= 0;
  }

  public isTouchingBottom() {
    return (
      this.pos.y >=
      this.ctxBoundries.bottom - this.ctxBoundries.top - this.size.height
    );
  }

  public isTouchingRight() {
    return (
      this.pos.x >=
      this.ctxBoundries.right - this.ctxBoundries.left - this.size.width
    );
  }

  public isTouchingLeft() {
    return this.pos.x <= 0;
  }

  // Private methods
  private updatePosition(keyboard: Keyboard): void {
    if (keyboard.isPressed("ArrowUp")) {
      if (!this.isTouchingTop()) {
        this.pos.y -= this.speed;
      }
    }
    if (keyboard.isPressed("ArrowDown")) {
      if (!this.isTouchingBottom()) {
        this.pos.y += this.speed;
      }
    }
    if (keyboard.isPressed("ArrowLeft")) {
      if (!this.isTouchingLeft()) {
        this.pos.x -= this.speed;
      }
    }
    if (keyboard.isPressed("ArrowRight")) {
      if (!this.isTouchingRight()) {
        this.pos.x += this.speed;
      }
    }
  }

  // Public methods
  public update(keyboard: Keyboard): void {
    this.updatePosition(keyboard);
  }
}
