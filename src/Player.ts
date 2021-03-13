import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Keyboard from "./Keyboard";

export default class Player extends Entity {
  // Members
  private ctxBoundries: DOMRect;
  private gravity: number;
  private jumpStrength: number;
  private isOnGround: boolean;
  public isMoving: boolean;

  // Constructor
  constructor(image: string, ctxBoundries: DOMRect) {
    super(image);
    this.ctxBoundries = ctxBoundries;
    this.pos = { x: 0, y: 500 };
    this.size = { width: 80, height: 80 };
    this.gravity = 0.75;
    this.velocityX = 10;
    this.velocityY = 0;
    this.jumpStrength = 15;
  }

  // Public methods
  public update(keyboard: Keyboard): void {
    this.handlePosition();
    this.handleKeyboard(keyboard);
  }

  public isApproachingRight(): boolean {
    return (
      this.pos.x >=
      this.ctxBoundries.right -
        this.ctxBoundries.left -
        this.size.width -
        GAME_CONFIG.SCREEN_MARGIN
    );
  }

  public isApproacingLeft(): boolean {
    return this.pos.x <= 0 + GAME_CONFIG.SCREEN_MARGIN;
  }

  // Private methods
  private getBottomOfScreen(): number {
    return this.ctxBoundries.bottom - this.ctxBoundries.top - this.size.height;
  }

  private moveLeft(): void {
    this.pos.x -= this.velocityX;
  }

  private moveRight(): void {
    this.isMoving = true;
    this.pos.x += this.velocityX;
  }

  private isTouchingTop(): boolean {
    return this.pos.y <= 0;
  }

  private jump(): void {
    this.velocityY = -this.jumpStrength;
  }

  private checkIfOnGround(): void {
    if (this.pos.y > this.getBottomOfScreen()) {
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
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
      if (!this.isTouchingTop() && this.isOnGround) {
        this.jump();
      }
      return;
    }
    if (keyboard.isPressed("ArrowLeft")) {
      if (!this.isApproacingLeft()) {
        this.moveLeft();
      }
      return;
    }
    if (keyboard.isPressed("ArrowRight")) {
      if (!this.isApproachingRight()) {
        this.moveRight();
      }
      return;
    }
    this.isMoving = false;
  }
}
