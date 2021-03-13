import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Keyboard from "./Keyboard";

export default class Player extends Entity {
  // Members
  private ctxBoundries: DOMRect;
  private gravity: number;
  private jumpStrength: number;
  private isOnGround: boolean;
  public movingDirection: string | null;

  // Constructor
  constructor(image: string, ctxBoundries: DOMRect) {
    super(image);
    this.ctxBoundries = ctxBoundries;
    this.pos = { x: 0, y: 500 };
    this.size = { width: 80, height: 80 };
    this.gravity = 0.65;
    this.velocityX = 10;
    this.velocityY = 0;
    this.jumpStrength = 17.5;
  }

  // Public methods
  public update(keyboard: Keyboard): void {
    this.handlePosition();
    this.handleKeyboard(keyboard);
  }

  public reachedRightEnd(): boolean {
    return (
      this.pos.x >=
      this.ctxBoundries.right -
        this.ctxBoundries.left -
        this.size.width -
        GAME_CONFIG.SCREEN_MARGIN
    );
  }

  public reachedLeftEnd(): boolean {
    return this.pos.x <= 0 + GAME_CONFIG.SCREEN_MARGIN;
  }

  // Private methods
  private isTouchingTop(): boolean {
    return this.pos.y <= 0;
  }

  private getBottomOfScreen(): number {
    return this.ctxBoundries.bottom - this.ctxBoundries.top - this.size.height;
  }

  private checkIfOnGround(): void {
    if (this.pos.y > this.getBottomOfScreen()) {
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }

  private move(): void {
    switch (this.movingDirection) {
      case "left":
        this.pos.x -= this.velocityX;
        break;
      case "right":
        this.pos.x += this.velocityX;
        break;
    }
  }

  private jump(): void {
    this.velocityY = -this.jumpStrength;
  }

  private handlePosition(): void {
    this.checkIfOnGround();

    this.velocityY += this.gravity;
    this.pos.y += this.velocityY;

    // Stop animation when reached bottom of screen
    if (this.isOnGround) {
      this.pos.y = this.getBottomOfScreen();
      this.velocityY = 0;
    }
  }

  private handleKeyboard(keyboard: Keyboard): void {
    if (keyboard.isPressed(" ")) {
      this.movingDirection = "up";
      if (!this.isTouchingTop() && this.isOnGround) {
        this.jump();
      }
      return;
    }
    if (keyboard.isPressed("ArrowLeft")) {
      this.movingDirection = "left";
      if (!this.reachedLeftEnd()) {
        this.move();
      }
      return;
    }
    if (keyboard.isPressed("ArrowRight")) {
      this.movingDirection = "right";
      if (!this.reachedRightEnd()) {
        this.move();
      }
      return;
    }
    this.movingDirection = null;
  }
}
