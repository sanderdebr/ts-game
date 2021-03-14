import Canvas2D from "./Canvas2D";
import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Keyboard from "./input/Keyboard";

export default class Player extends Entity {
  // Members
  private keyboard: Keyboard;
  private gravity: number;
  private jumpStrength: number;
  private isOnGround: boolean;
  public movingDirection: string | null;
  public isOnPlatform: boolean;
  public platformY: number;
  public isHittingPlatform: boolean;

  // Constructor
  constructor(image: string, canvas: Canvas2D, keyboard: Keyboard) {
    super(image, canvas);
    this.keyboard = keyboard;
    this.pos = { x: 0, y: 500 };
    this.size = { width: 80, height: 80 };
    this.gravity = 0.8;
    this.velocityX = 10;
    this.velocityY = 0;
    this.jumpStrength = 17.5;
  }

  // Public methods
  public update(): void {
    this.handlePosition();
    this.handleKeyboard();
  }

  public reachedRightEnd(): boolean {
    return (
      this.pos.x >=
      this.canvasPos.right -
        this.canvasPos.left -
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
    return this.canvasPos.bottom - this.canvasPos.top - this.size.height;
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
    this.isOnGround = this.pos.y > this.getBottomOfScreen();

    this.velocityY += this.gravity;
    this.pos.y += this.velocityY;

    if (this.isOnGround) {
      this.pos.y = this.getBottomOfScreen();
      this.velocityY = 0; // Stop animation when reached bottom of screen
    }

    if (this.isOnPlatform) {
      if (this.pos.y >= this.platformY) {
        this.pos.y = this.platformY;
        this.velocityY = 0;
      }
    }

    if (this.isHittingPlatform) {
      this.velocityY = 20;
      this.pos.y += this.velocityY;
      this.isHittingPlatform = false;
    }
  }

  private handleKeyboard(): void {
    if (this.keyboard.isPressed(" ")) {
      this.movingDirection = "up";
      if (!this.isTouchingTop()) {
        if (this.isOnGround || this.isOnPlatform) {
          this.jump();
        }
      }
      return;
    }
    if (this.keyboard.isPressed("ArrowLeft")) {
      this.movingDirection = "left";
      if (!this.reachedLeftEnd()) {
        this.move();
      }
      return;
    }
    if (this.keyboard.isPressed("ArrowRight")) {
      this.movingDirection = "right";
      if (!this.reachedRightEnd()) {
        this.move();
      }
      return;
    }
    this.movingDirection = null;
  }
}
