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
  private moveUp() {
    this.pos.y -= this.speed;
  }

  private moveDown() {
    this.pos.y += this.speed;
  }

  private moveLeft() {
    this.pos.x -= this.speed;
  }

  private moveRight() {
    this.pos.x += this.speed;
  }

  private isTouchingTop() {
    return this.pos.y <= 0;
  }

  private isTouchingBottom() {
    return (
      this.pos.y >=
      this.ctxBoundries.bottom - this.ctxBoundries.top - this.size.height
    );
  }

  private updatePosition(keyboard: Keyboard): void {
    if (keyboard.isPressed("ArrowUp")) {
      if (!this.isTouchingTop()) {
        this.moveUp();
      }
    }
    if (keyboard.isPressed("ArrowDown")) {
      if (!this.isTouchingBottom()) {
        this.moveDown();
      }
    }
    if (keyboard.isPressed("ArrowLeft")) {
      if (!this.isApproacingLeft()) {
        this.moveLeft();
      }
    }
    if (keyboard.isPressed("ArrowRight")) {
      if (!this.isApproachingRight()) {
        this.moveRight();
      }
    }
  }

  // Public methods
  public update(keyboard: Keyboard): void {
    this.updatePosition(keyboard);
  }
}
