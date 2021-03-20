import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import Renderable from "../game/Renderable";
import PLATFORM_IMAGE from "../images/grass.png";
import { imageLoader, randomRangeInt } from "../utils";
import { Observer } from "./../interfaces/Observer";

export default class Platform extends Renderable implements Observer {
  // Constructor
  constructor(canvas2D: Canvas2D, x: number, y: number) {
    super(canvas2D);
    this.canvas2D = canvas2D;
    this.size = {
      width: randomRangeInt(400, 600),
      height: GAME_CONFIG.PLATFORM_HEIGHT,
    };
    this.pos = { x, y };

    imageLoader(PLATFORM_IMAGE).then((image) => {
      this.image = image;
      this.createPattern();
      this.loading = false;
    });
  }

  // Public methods
  public notify(): void {
    console.log("notified");
  }

  public update(): void {
    this.draw();
  }

  public draw(): void {
    this.canvas2D.ctx.save();
    this.canvas2D.ctx.fillStyle = this.pattern;
    this.canvas2D.ctx.translate(this.pos.x, this.pos.y);
    this.canvas2D.ctx.fillRect(0, 0, this.size.width, this.size.height);
    this.canvas2D.ctx.restore();
  }
}
