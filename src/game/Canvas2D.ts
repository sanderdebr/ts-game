import { GAME_CONFIG } from "../config";
import BUTTON_IMAGE from "../images/button.png";
import { imageLoader } from "../utils";

export default class Canvas2D {
  // Members
  protected image: HTMLImageElement;
  private canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public boundries: DOMRect;

  // Constructor
  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.boundries = this.canvas.getBoundingClientRect();

    imageLoader(BUTTON_IMAGE).then((image) => {
      this.image = image;
    });
  }

  // Private methods
  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawBackground(backgroundColor: string): void {
    this.ctx.save();
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  private renderText(text: string): void {
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.font = GAME_CONFIG.FONT;
    this.ctx.fillStyle = GAME_CONFIG.TEXT_COLOR;
    this.ctx.fillText(
      text,
      this.canvas.width / 2 - textWidth / 2,
      this.canvas.height / 2
    );
  }

  private drawButton(): void {
    this.ctx.drawImage(
      this.image,
      this.canvas.width / 2 - GAME_CONFIG.BUTTON_WIDTH / 2,
      this.canvas.height / 2 - 55,
      GAME_CONFIG.BUTTON_WIDTH,
      GAME_CONFIG.BUTTON_HEIGHT
    );
  }

  // Public methods
  public update(): void {
    this.clear();
    this.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
  }

  public showLoadingScreen(): void {
    // this.drawButton();
    this.renderText("LOADING");
  }

  public showStartScreen(): void {
    this.drawButton();
    this.renderText("START");
  }

  // Getters and settrs
  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }
}
