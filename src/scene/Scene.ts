import BG_IMAGE from "../images/background.png";
import { Size, Vector } from "../types";
import Player from "../Player";
import Canvas2D from "../Canvas2D";
import { IGameObject } from "../interfaces";
import Platform from "./Platform";

export default class Scene implements IGameObject {
  // Members
  public canvas: Canvas2D;
  public player: Player;
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();

  private pattern: CanvasPattern;
  private platforms: Platform[] = [];

  // Constructor
  constructor(canvas: Canvas2D, player: Player) {
    this.canvas = canvas;
    this.player = player;
    this.pos = { x: 0, y: 0 };
    this.size = { width: 1400, height: 600 };
    this.image.src = BG_IMAGE;
    this.image.onload = this.createPattern.bind(this);

    this.addPlatform();
  }

  // Public methods
  public update(): void {
    this.canvas.ctx.save();

    if (
      this.player.reachedLeftEnd() &&
      !this.reachedLeftEnd() &&
      this.player.movingDirection === "left"
    ) {
      this.move("right");
    }
    if (
      this.player.reachedRightEnd() &&
      !this.reachedRightEnd() &&
      this.player.movingDirection === "right"
    ) {
      this.move("left");
    }

    this.platforms.forEach((platform) => {
      platform.update(this.canvas.ctx, this.player);
    });
  }

  public draw(): void {
    this.canvas.ctx.fillStyle = this.pattern;
    this.canvas.ctx.translate(this.pos.x, this.pos.y);
    this.canvas.ctx.fillRect(0, 0, this.size.width, this.size.height);

    this.platforms.forEach((platform) => {
      platform.draw(this.canvas.ctx);
    });

    this.canvas.ctx.restore();
  }

  // Private methods
  createPattern(): void {
    this.pattern = this.canvas.ctx.createPattern(this.image, "repeat-x");
  }

  private addPlatform(): void {
    this.platforms.push(new Platform(this.canvas, 200, 400));
    this.platforms.push(new Platform(this.canvas, 500, 200));
  }

  private reachedLeftEnd(): boolean {
    return this.pos.x >= 0;
  }

  private reachedRightEnd(): boolean {
    return this.pos.x >= this.size.width;
  }

  private move(direction: string): void {
    switch (direction) {
      case "right":
        this.pos.x += 5;
        break;
      case "left":
        this.pos.x -= 5;
    }
  }
}
