import Canvas2D from "./Canvas2D";
import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Player from "./Player";

import PLAYER_IMAGE from "./images/player.png";

export default class Game {
  private canvas2D: Canvas2D;
  private player: Player;
  private entities: Map<string, Entity> = new Map();

  private static instance: Game;

  private constructor() {
    this.canvas2D = new Canvas2D();
    this.player = new Player(PLAYER_IMAGE);
    this.entities.set("player", this.player);
    this.gameLoop();
  }

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private gameLoop(): void {
    this.canvas2D.clear();
    this.canvas2D.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
    this.updateEntities();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private updateEntities(): void {
    this.entities.forEach((entity) => {
      entity.update();
      entity.draw(this.canvas2D.ctx);
    });
  }
}