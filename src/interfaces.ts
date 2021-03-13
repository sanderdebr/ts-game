import Canvas2D from "./Canvas2D";
import { Size, Vector } from "./types";

export interface IGameObject {
  // Members
  pos: Vector;
  size: Size;
  image: HTMLImageElement;
  canvas: Canvas2D;

  // Methods
  update(): void;
  draw(): void;
}
