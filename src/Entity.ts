import Canvas2D from "./Canvas2D";
import { IGameObject } from "./interfaces";
import { Size, Vector } from "./types";

export default abstract class Entity implements IGameObject {
  // Members
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  public canvas: Canvas2D;
  public canvasPos: DOMRect;
  public velocityX: number;
  public velocityY: number;

  // Constructor
  constructor(image: string, canvas: Canvas2D) {
    this.image.src = image;
    this.canvas = canvas;
    this.canvasPos = this.canvas.boundries;
  }

  // Public methods
  public update(): void {}

  public draw(): void {
    this.canvas.ctx.drawImage(
      this.image,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
}
