import BG_IMAGE from "./images/background.png";
import { Size, Vector } from "./types";
import Player from "./Player";

export default class Scene {
  // Members
  public ctx: CanvasRenderingContext2D;
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();

  // Constructor
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 };
    this.size = { width: 5000, height: 600 };
    this.image.src = BG_IMAGE;

    this.image.onload = this.createPattern.bind(this);
  }

  // Private methods
  private createPattern(): void {
    const pattern = this.ctx.createPattern(this.image, "repeat");
    this.ctx.fillStyle = pattern;
  }
  private reachedLeftEnd(): boolean {
    return this.pos.x >= 0;
  }

  private reachedRightEnd(): boolean {
    return this.pos.x >= this.size.width;
  }

  private updateScene(player: Player): void {
    if (player.isApproacingLeft() && !this.reachedLeftEnd()) {
      this.pos.x += 5;
    }
    if (player.isApproachingRight() && !this.reachedRightEnd()) {
      this.pos.x -= 5;
    }
  }

  // Public methods
  public updateAndDraw(player: Player): void {
    this.ctx.save();
    this.updateScene(player);
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    this.ctx.restore();
  }
}
