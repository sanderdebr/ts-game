import Keyboard from "./Keyboard";

type Vector = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

export default abstract class Entity {
  // Members
  public pos: Vector;
  public size: Size;
  public image: HTMLImageElement = new Image();
  public speed: number;
  public ctxBoundries: DOMRect;

  // Constructor
  constructor(image: string, ctxBoundries: DOMRect) {
    this.pos = { x: 0, y: 0 };
    this.size = { width: 100, height: 100 };
    this.image.src = image;
    this.speed = 0;
    this.ctxBoundries = ctxBoundries;
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
