import { GAME_CONFIG } from "../config";
import Canvas2D from "../game/Canvas2D";
import Renderable from "../game/Renderable";
import BG_IMAGE from "../images/background.png";
import { Subject } from "../interfaces/Subject";
import { Observer } from "../interfaces/Observer";
import Platform from "./Platform";

export default class Level extends Renderable implements Subject {
  // Members
  public observers: Observer[] = [];
  public platforms: Platform[] | null = [];

  // Constructor
  constructor(canvas2D: Canvas2D) {
    super();
    this.canvas2D = canvas2D;
    this.pos = { x: 0, y: 0 };
    this.speed = 10;
    this.size = {
      width: GAME_CONFIG.LEVEL_WIDTH,
      height: this.canvas2D.height,
    };
    this.image = new Image();
    this.image.src = BG_IMAGE;
    this.image.onload = this.createPattern.bind(this);

    this.generatePlatforms();
  }

  // Private methods
  generatePlatforms(): void {
    let platform = new Platform(this.canvas2D, 400, 400);
    this.platforms.push(platform);
    this.attach(platform);
  }

  // Public methods
  public move(direction: string): void {
    switch (direction) {
      case "left":
        this.pos.x += this.speed;
        break;
      case "right":
        this.pos.x -= this.speed;
        break;
    }
  }

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {}

  public notify(): void {
    for (const observer of this.observers) {
      observer.notify(this);
    }
  }

  public update(): void {
    this.canvas2D.ctx.save();

    this.draw();
    this.platforms.forEach((platform) => {
      platform.update();
    });

    this.canvas2D.ctx.restore();
  }

  public draw(): void {
    this.canvas2D.ctx.fillStyle = this.pattern;
    this.canvas2D.ctx.translate(this.pos.x, this.pos.y);
    this.canvas2D.ctx.fillRect(0, 0, this.size.width, this.size.height);
  }
}
