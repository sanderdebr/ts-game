import GRASS_IMAGE from "../images/grass.png";
import Canvas2D from "../Canvas2D";
import { IGameObject } from "../interfaces";
import { Size, Vector } from "../types";
import Player from "../Player";

export default class Platform {
  // Members
  public canvas: Canvas2D;
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  private pattern: CanvasPattern;

  // Constructor
  constructor(canvas: Canvas2D) {
    this.canvas = canvas;
    this.pos = { x: 400, y: 400 };
    this.size = { width: 500, height: 80 };
    this.image.src = GRASS_IMAGE;
    this.image.onload = this.createPattern.bind(this);
  }

  // Public methods
  public update(ctx: CanvasRenderingContext2D, player: Player): void {
    this.detectCollision(player);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.canvas.ctx.fillStyle = this.pattern;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }

  // Private methods
  detectCollision(player: Player) {
    if (
      player.pos.x >= this.pos.x &&
      player.pos.x < this.pos.x + this.size.width &&
      player.pos.y + player.size.height <= this.pos.y
    ) {
      player.isOnPlatform = true;
      player.platformY = this.pos.y - this.size.height;
    } else {
      player.isOnPlatform = false;
    }
  }

  createPattern(): void {
    this.pattern = this.canvas.ctx.createPattern(this.image, "repeat");
  }
}
