import Canvas2D from "./Canvas2D";
import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Player from "./Player";
import Keyboard from "./Keyboard";

import PLAYER_IMAGE from "./images/player.png";
import Scene from "./Scene";

export default class Game {
  // Members
  private canvas2D: Canvas2D;
  private player: Player;
  private entities: Map<string, Entity> = new Map();
  private keyboard: Keyboard;
  private scene: Scene;

  private static instance: Game;

  // Constructor
  private constructor() {
    this.canvas2D = new Canvas2D();
    this.player = new Player(PLAYER_IMAGE, this.canvas2D.boundries);
    this.entities.set("player", this.player);
    this.keyboard = new Keyboard();
    this.scene = new Scene();
    this.gameLoop();
  }

  // Private methods
  private gameLoop(): void {
    this.canvas2D.clear();
    this.canvas2D.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
    this.scene.update(this.player); //TODO: Make position private
    this.scene.draw(this.canvas2D.ctx);
    this.updateEntities();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private updateEntities(): void {
    this.entities.forEach((entity) => {
      entity.update(this.keyboard);
      entity.draw(this.canvas2D.ctx);
    });
  }

  // Public methods
  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
