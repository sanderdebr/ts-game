import Canvas2D from "../Canvas2D";
import { GAME_CONFIG } from "../config";
import Player from "../characters/Player";
import Keyboard from "../input/Keyboard";

import Level from "./Level";
import GameObject from "./GameObject";
import Character from "../characters/Character";

export default class Game extends GameObject {
  // Members
  private static instance: Game;

  protected keyboard: Keyboard;

  private player: Player;
  private characters: Map<string, Character> = new Map();
  private level: Level;

  // Constructor
  private constructor() {
    super();
    this.canvas = new Canvas2D();
    this.keyboard = new Keyboard();
    this.player = new Player(this.canvas, this.keyboard);
    this.characters.set("player", this.player);
    this.level = new Level(this.canvas, this.player);
    this.gameLoop();
  }

  // Private methods
  private gameLoop(): void {
    this.canvas.clear();
    this.canvas.drawBackground(GAME_CONFIG.BACKGROUND_COLOR);
    this.level.update();
    this.level.draw();
    this.updateCharacters();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private updateCharacters(): void {
    this.characters.forEach((character) => {
      character.update();
      character.draw();
    });
  }

  private collisionHandler(): void {
    //
  }

  // Public methods
  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
