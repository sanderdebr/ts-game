import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import PLAYER_IMAGE from "../images/player.png";
import Level from "../levels/Level";
import Platform from "../levels/Platform";
import { imageLoader } from "../utils";
import Character from "./Character";

export default class Player extends Character {
  // Members
  private jumpStrength: number;
  private groundLevel: number;
  public isColliding: boolean;
  public isOnPlatform: Platform;

  // Constructor
  constructor(canvas2D: Canvas2D) {
    super(canvas2D);

    this.gravity = GAME_CONFIG.GRAVITY;
    this.friction = GAME_CONFIG.FRICTION;
    this.speed = GAME_CONFIG.PLAYER_SPEED;
    this.jumpStrength = GAME_CONFIG.PLAYER_JUMP_STRENGTH;
    this.size = {
      width: GAME_CONFIG.PLAYER_SIZE,
      height: GAME_CONFIG.PLAYER_SIZE,
    };
    this.groundLevel = this.canvas2D.height - this.size.height;

    imageLoader(PLAYER_IMAGE).then((image) => {
      this.image = image;
      this.loading = false;
    });

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
    this.isOnPlatform = null;
  }

  private updatePosition(): void {
    // Handle y position
    if (this.isOnPlatform !== null) {
      this.velocityY = 0; // stay on platform
    } else if (this.isColliding) {
      this.velocityY = this.jumpStrength; // move down from platform
    } else {
      this.velocityY += this.gravity; // regular gravity
    }
    this.pos.y += this.velocityY;

    // Handle x position
    this.velocityX *= this.friction;
    this.pos.x += this.velocityX;
  }

  private stopFalling(): void {
    this.velocityY = 0;
    this.gravity = 0;
    this.pos.y = this.groundLevel;
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
