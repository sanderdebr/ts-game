import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import MONSTER_IMAGE from "../images/mace.png";
import Level from "../levels/Level";
import { Vector } from "../types/Vector";
import { imageLoader } from "../utils";
import Character from "./Character";

export default class Monster extends Character {
  // Members
  private bounceSpeed: number;
  public isColliding: boolean;
  public startPos: Vector;

  // Constructor
  constructor(canvas2D: Canvas2D, x: number, y: number) {
    super(canvas2D);

    this.bounceSpeed = 1;
    this.velocityX = 0;
    this.velocityY = -25;

    this.size = {
      width: GAME_CONFIG.MONSTER_SIZE,
      height: GAME_CONFIG.MONSTER_SIZE,
    };
    this.startPos = { x, y };
    this.pos = { x, y };

    this.friction = GAME_CONFIG.FRICTION;
    this.speed = GAME_CONFIG.PLAYER_SPEED;

    imageLoader(MONSTER_IMAGE).then((image) => {
      this.image = image;
      this.loading = false;
    });
  }

  // Public methods
  public update(): void {
    this.updatePosition();
    this.draw();
  }

  // Private methods
  private updatePosition(): void {
    // Handle y position

    if (this.pos.y < 100) {
      this.velocityY = this.bounceSpeed;
    }
    if (this.pos.y > this.startPos.y) {
      this.velocityY = -this.bounceSpeed;
    }

    this.pos.y += this.velocityY;

    // Handle x position
    this.velocityX *= this.friction;
    this.pos.x += this.velocityX;
  }

  // Public methods
  public move(direction: string): void {
    switch (direction) {
      case "left":
        if (this.velocityX > -this.speed) {
          this.velocityX--;
        }
        break;
      case "right":
        if (this.velocityX < this.speed) {
          this.velocityX++;
        }
        break;
    }
  }
}
