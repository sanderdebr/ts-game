import { IObserver } from "./../interfaces/IObserver";
import GameObject from "../game/GameObject";
import Canvas2D from "../Canvas2D";
import Keyboard from "../input/Keyboard";

export default class Character extends GameObject implements IObserver {
  //Members
  protected canvasPos: DOMRect;

  // Constructor
  protected constructor(canvas: Canvas2D, keyboard: Keyboard) {
    super();
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.image = new Image();
    this.canvasPos = this.canvas.boundries;
  }

  // Public methods
  public update(): void {}
  public notify(): void {}
}
