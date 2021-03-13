import { IGameObject } from "./interfaces";
import { Size, Vector } from "./types";

export default abstract class Entity implements IGameObject {
  // Members
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  public velocityX: number;
  public velocityY: number;

  // Constructor
  constructor(image: string) {
    this.image.src = image;
  }

  // Public members
  public update(any): void {}

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
}
