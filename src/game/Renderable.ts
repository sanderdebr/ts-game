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
  protected pattern: CanvasPattern;

  public loading: boolean;

  // Constructor
  protected constructor(canvas2D: Canvas2D) {
    this.canvas2D = canvas2D;
    this.loading = true;
  }

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

  protected createPattern(): void {
    this.pattern = this.canvas2D.ctx.createPattern(this.image, "repeat-x");
  }

  // Getter and setters
  get posX(): number {
    return this.pos.x;
  }

  set posX(x: number) {
    this.pos.x = x;
  }

  get posY(): number {
    return this.pos.y;
  }

  set posY(y: number) {
    this.pos.y = y;
  }

  get width(): number {
    return this.size.width;
  }

  get height(): number {
    return this.size.height;
  }
}
