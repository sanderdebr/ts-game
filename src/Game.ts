import Canvas2D from "./Canvas2D";
import { GAME_CONFIG } from "./config";
import Entity from "./Entity";
import Player from "./Player";
import Keyboard from "./input/Keyboard";

import PLAYER_IMAGE from "./images/player.png";
import Scene from "./scene/Scene";

export default class Game {
  // Members
  private canvas: Canvas2D;
  private player: Player;
  private entities: Map<string, Entity> = new Map();
  private keyboard: Keyboard;
  private scene: Scene;

  private static instance: Game;

  // Constructor
  private constructor() {
    this.canvas = new Canvas2D();
    this.keyboard = new Keyboard();
    this.player = new Player(PLAYER_IMAGE, this.canvas, this.keyboard);
    this.entities.set("player", this.player);
    this.scene = new Scene(this.canvas, this.player);
    this.gameLoop();
  }

  // Private methods
  private gameLoop(): void {
    this.canvas.clear();
    this.canvas.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
    this.scene.update();
    this.scene.draw();
    this.updateEntities();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private updateEntities(): void {
    this.entities.forEach((entity) => {
      entity.update();
      entity.draw();
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
