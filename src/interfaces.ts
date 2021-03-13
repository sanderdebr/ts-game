import Canvas2D from "./Canvas2D";
import Player from "./Player";
import { Size, Vector } from "./types";

export interface IGameObject {
  // Members
  pos: Vector;
  size: Size;
  image: HTMLImageElement;
  canvas: Canvas2D;

  // Methods
  update(ctx?: CanvasRenderingContext2D, player?: Player): void;
  draw(ctx?: CanvasRenderingContext2D): void;
}
