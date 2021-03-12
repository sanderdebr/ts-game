export default class Canvas2D {
  // Members
  private canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  // Constructor
  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(backgroundColor: string) {
    this.ctx.save();
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }
}
