import { Size } from "../types/Size";
import { Vector } from "../types/Vector";
import Canvas2D from "./Canvas2D";

export default abstract class Renderable {
  // abstract methods have to be implemented
  // protected is available on instances only
  protected canvas2D: Canvas2D;
  protected image: HTMLImageElement;

  protected pos: Vector;
  protected size: Size;
  protected speed: number;

  protected move(direction: string): void {}

  protected update(): void {}

  protected draw(): void {
    this.canvas2D.ctx.drawImage(
      this.image,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
}
