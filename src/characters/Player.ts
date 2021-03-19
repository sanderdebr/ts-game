import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import PLAYER_IMAGE from "../images/player.png";
import Level from "../levels/Level";
import { Vector } from "../types/Vector";
import Character from "./Character";

export default class Player extends Character {
  // Members
  private jumpStrength: number;
  private groundLevel: number;

  public isColliding: boolean;
  public isOnPlatform: boolean;

  // Constructor
  constructor(canvas2D: Canvas2D) {
    super(canvas2D);

    this.gravity = 1;
    this.friction = 0.9;
    this.speed = 10;
    this.jumpStrength = 25;
    this.size = {
      width: GAME_CONFIG.PLAYER_SIZE,
      height: GAME_CONFIG.PLAYER_SIZE,
    };
    this.groundLevel = this.canvas2D.height - this.size.height;
    this.image.src = PLAYER_IMAGE;

    this.start();
  }

  // Public methods
  public update(): void {
    this.updatePosition();
    if (this.isOnGround()) this.stopFalling();
    this.draw();
  }

  public notify(level: Level): void {
    console.log("notify");
  }

  // Private methods
  private start(): void {
    this.velocityX = 0;
    this.velocityY = 0;
    this.pos = { x: 0, y: this.groundLevel };
  }

  private updatePosition(): void {
    // Handle y position
    if (this.isColliding) {
      if (this.isOnPlatform) {
        this.velocityY = 0;
      } else {
        this.velocityY = this.jumpStrength;
      }
    } else {
      this.velocityY += this.gravity;
    }
    this.pos.y += this.velocityY;

    // Handle x position
    this.velocityX *= this.friction;
    this.pos.x += this.velocityX;

    this.pos.x += this.velocityX;
  }

  private stopFalling(): void {
    this.velocityY = 0;
    this.gravity = 0;
  }

  // Public methods
  public jump(): void {
    this.velocityY = -this.jumpStrength;
    this.gravity = 1;
  }

  public move(direction: string): void {
    switch (direction) {
      case "left":
        if (this.velocityX > -this.speed) this.velocityX--;
        break;
      case "right":
        if (this.velocityX < this.speed) this.velocityX++;
        break;
    }
  }

  public isOnGround(): boolean {
    return this.pos.y >= this.groundLevel;
  }

  // Getters and setters
  get getJumpStrength(): number {
    return this.jumpStrength;
  }

  set setJumpStrength(jumpStrength: number) {
    this.jumpStrength = jumpStrength;
  }
}
