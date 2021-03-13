import { Size, Vector } from "./types";

export interface IGameObject {
  // Members
  pos: Vector;
  size: Size;
  image: HTMLImageElement;
  velocityX: number;
  velocityY: number;

  // Methods
  update(any): void;

  draw(ctx: CanvasRenderingContext2D): void;
}
