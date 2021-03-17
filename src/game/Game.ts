import Character from "../characters/Character";
import Player from "../characters/Player";
import Keyboard from "../input/Keyboard";
import Level from "../levels/Level";
import Canvas2D from "./Canvas2D";
import Engine from "./Engine";

export default class Game {
  // Members
  private static instance: Game;
  private canvas2D: Canvas2D;
  private player: Player;
  private keyboard: Keyboard;
  private level: Level;
  private engine: Engine;
  private characters: Map<string, Character> = new Map();

  // Constructor
  private constructor() {
    this.canvas2D = new Canvas2D();
    this.player = new Player(this.canvas2D);
    this.keyboard = new Keyboard();
    this.level = new Level(this.canvas2D);
    this.characters.set("Player", this.player);
    this.engine = new Engine(
      this.canvas2D,
      this.player,
      this.keyboard,
      this.level
    );
    this.gameLoop();
  }

  // Private methods
  private gameLoop(): void {
    this.canvas2D.update();
    this.level.update();
    this.engine.update();
    this.updateCharacters();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private updateCharacters(): void {
    this.characters.forEach((character) => {
      character.update();
    });
  }

  // Public methods
  public static startGame() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
