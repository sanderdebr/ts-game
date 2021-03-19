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

  // Getters and setters
  get getVelocityX(): number {
    return this.velocityX;
  }

  set setVelocityX(x: number) {
    this.velocityX = x;
  }

  get getVelocityY(): number {
    return this.velocityY;
  }

  set setVelocityY(y: number) {
    this.velocityY = y;
  }

  get getGravity(): number {
    return this.gravity;
  }

  set setGravity(gravity: number) {
    this.gravity = gravity;
  }
}
