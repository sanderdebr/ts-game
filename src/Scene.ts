import BG_IMAGE from "./images/bg.gif";
import { Vector } from "./types";
import Player from "./Player";

export default class Scene {
  // Members
  public pos: Vector;
  public image: HTMLImageElement = new Image();

  // Constructor
  constructor() {
    this.pos = { x: -1000, y: 0 };
    this.image.src = BG_IMAGE;
  }

  // Private methods
  private updateScene(player: Player): void {
    if (player.isApproacingLeft()) {
      this.pos.x += 2;
    }
    if (player.isApproachingRight()) {
      this.pos.x -= 2;
    }
  }

  // Public methods
  public update(player: Player): void {
    this.updateScene(player);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, 3000, 600);
  }
}
