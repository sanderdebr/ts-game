import GRASS_IMAGE from "../images/grass.png";
import Canvas2D from "../Canvas2D";
import { IGameObject } from "../interfaces";
import { Size, Vector } from "../types";
import Player from "../Player";

export default class Platform implements IGameObject {
  // Members
  public canvas: Canvas2D;
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  private pattern: CanvasPattern;
  private playerIsOnThisPlatform: boolean;

  // Constructor
  constructor(canvas: Canvas2D, x: number, y: number) {
    this.canvas = canvas;
    this.pos = { x, y };
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
  private isOnTop(player: Player): boolean {
    return (
      player.pos.x + player.size.width >= this.pos.x &&
      player.pos.x < this.pos.x + this.size.width &&
      player.pos.y + player.size.height <= this.pos.y
    );
  }

  private isHittingLeft(player: Player): boolean {
    return (
      player.pos.x + player.size.width >= this.pos.x &&
      player.pos.x <= this.pos.x &&
      player.pos.y >= this.pos.y &&
      player.pos.y <= this.pos.y + this.size.height
    );
  }

  private isHittingRight(player: Player): boolean {
    return (
      player.pos.x <= this.pos.x + this.size.width &&
      player.pos.x >= this.pos.x + this.size.width - player.size.width &&
      player.pos.y >= this.pos.y &&
      player.pos.y <= this.pos.y + this.size.height
    );
  }

  private isHittingBottom(player: Player): boolean {
    return (
      player.pos.x + player.size.width >= this.pos.x &&
      player.pos.x <= this.pos.x + this.size.width &&
      player.pos.y >= this.pos.y &&
      player.pos.y <= this.pos.y + this.size.height
    );
  }

  private detectCollision(player: Player): void {
    if (
      this.isHittingRight(player) ||
      this.isHittingLeft(player) ||
      this.isHittingBottom(player)
    ) {
      player.isHittingPlatform = true;
    }

    if (this.isOnTop(player)) {
      this.playerIsOnThisPlatform = true;
      player.isOnPlatform = true;
      player.platformY = this.pos.y - this.size.height;
    }

    if (this.playerIsOnThisPlatform) {
      if (!this.isOnTop(player)) {
        this.playerIsOnThisPlatform = false;
        player.isOnPlatform = false;
      }
    }
  }

  private createPattern(): void {
    this.pattern = this.canvas.ctx.createPattern(this.image, "repeat");
  }
}
