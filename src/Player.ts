import Entity from "./Entity";
import Keyboard from "./Keyboard";

export default class Player extends Entity {
  // Members
  private ctxBoundries: DOMRect;
  private margin = 100;

  // Constructor
  constructor(image: string, ctxBoundries: DOMRect) {
    super(image);
    this.image.src = image;
    this.ctxBoundries = ctxBoundries;
    this.speed = 15;
    this.margin = 100;
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

  public isApproachingRight() {
    return (
      this.pos.x >=
      this.ctxBoundries.right -
        this.ctxBoundries.left -
        this.size.width -
        this.margin
    );
  }

  public isApproacingLeft() {
    return this.pos.x <= 0 + this.margin;
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
      if (!this.isApproacingLeft()) {
        this.pos.x -= this.speed;
      }
    }
    if (keyboard.isPressed("ArrowRight")) {
      if (!this.isApproachingRight()) {
        this.pos.x += this.speed;
      }
    }
  }

  // Public methods
  public update(keyboard: Keyboard): void {
    this.updatePosition(keyboard);
  }
}
