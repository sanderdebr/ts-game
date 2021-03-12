import Keyboard from "./Keyboard";
import { Size, Vector } from "./types";

export default abstract class Entity {
  // Members
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  public speed: number;

  // Constructor
  constructor(image: string) {
    this.pos = { x: 0, y: 500 };
    this.size = { width: 100, height: 100 };
    this.image.src = image;
    this.speed = 0;
  }

  // Public members
  public update(keyboard: Keyboard): void {}

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
