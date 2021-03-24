import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import Renderable from "../game/Renderable";
import { Observer } from "../interfaces/Observer";
import { imageLoader } from "../utils";
import COIN_IMAGE from "../images/coin.png";

export default class Coin extends Renderable implements Observer {
  public active: boolean = true;

  // Constructor
  constructor(canvas2D: Canvas2D, x: number, y: number) {
    super(canvas2D);
    this.canvas2D = canvas2D;
    this.size = {
      width: GAME_CONFIG.COIN_SIZE,
      height: GAME_CONFIG.COIN_SIZE,
    };
    this.pos = { x, y };

    imageLoader(COIN_IMAGE).then((image) => {
      this.image = image;
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
}
