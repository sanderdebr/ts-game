type Vector = {
  x: number;
  y: number;
};

export default abstract class Entity {
  private pos: Vector;
  public image: HTMLImageElement = new Image();

  constructor(image: string) {
    this.pos = { x: 0, y: 0 };
    this.image.src = image;
  }
  update(): void {
    this.pos.x += 0.1;
    this.pos.y += 0.1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, 25, 25);
  }
}
