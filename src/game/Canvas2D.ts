import { GAME_CONFIG } from "../config";

export default class Canvas2D {
  // Members
  private canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public boundries: DOMRect;

  // Constructor
  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.boundries = this.canvas.getBoundingClientRect();
  }

  // Private methods
  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawBackground(backgroundColor: string) {
    this.ctx.save();
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  // Public methods
  public update() {
    this.clear();
    this.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
  }

  // Getters and settrs
  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}
