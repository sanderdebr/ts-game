import { GAME_CONFIG } from "../config";
import { Vector } from "../types/Vector";
import { imageLoader } from "../utils";
import Canvas2D from "./Canvas2D";
import Renderable from "./Renderable";
import BUTTON_IMAGE from "../images/button.png";

export default class GUI extends Renderable {
  private buttonPos: Vector;

  // Constructor
  constructor(canvas2D: Canvas2D) {
    super(canvas2D);

    this.buttonPos = {
      x: this.canvas2D.width / 2 - GAME_CONFIG.BUTTON_WIDTH / 2,
      y: this.canvas2D.height / 2 - GAME_CONFIG.BUTTON_HEIGHT / 1.5,
    };

    imageLoader(BUTTON_IMAGE).then((image) => {
      this.image = image;
    });
  }

  // Private methods
  private renderText(text: string, color: string): void {
    const textWidth = this.canvas2D.ctx.measureText(text).width;
    this.canvas2D.ctx.font = GAME_CONFIG.FONT;
    this.canvas2D.ctx.fillStyle = color;
    this.canvas2D.ctx.fillText(
      text,
      this.canvas2D.width / 2 - textWidth / 2,
      this.canvas2D.height / 2
    );
  }

  private drawButton(): void {
    this.canvas2D.ctx.drawImage(
      this.image,
      this.buttonPos.x,
      this.buttonPos.y,
      GAME_CONFIG.BUTTON_WIDTH,
      GAME_CONFIG.BUTTON_HEIGHT
    );
  }

  // Public methods
  public showLoadingScreen(): void {
    this.renderText("LOADING", "black");
  }

  public showStartScreen(): void {
    this.drawButton();
    this.renderText("PRESS ENTER", "white");
  }
}