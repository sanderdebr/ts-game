import Canvas2D from "../game/Canvas2D";
import Renderable from "../game/Renderable";
import { Observer } from "../interfaces/Observer";

export default class Character extends Renderable implements Observer {
  //Members
  protected canvasPos: DOMRect;
  protected gravity: number;
  protected friction: number;
  protected velocityX: number;
  protected velocityY: number;

  // Constructor
  protected constructor(canvas2D: Canvas2D) {
    super();
    this.canvas2D = canvas2D;
    this.image = new Image();
  }

  // Public methods
  public update(): void {}

  public notify(any: any): void {}
}
