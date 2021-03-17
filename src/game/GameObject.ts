import Canvas2D from "../Canvas2D";
import Keyboard from "../input/Keyboard";
import { Size } from "../types/Size";
import { Vector } from "../types/Vector";

export default abstract class GameObject {
  // abstract methods have to be implemented
  // protected is available on instances only
  protected canvas: Canvas2D;
  protected keyboard: Keyboard;
  protected image: HTMLImageElement;
  protected pos: Vector;
  protected size: Size;
  protected velocityX: number;
  protected velocityY: number;

  protected update(): void {}

  protected draw(): void {
    this.canvas.ctx.drawImage(
      this.image,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
}
