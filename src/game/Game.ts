import Character from "../characters/Character";
import Player from "../characters/Player";
import Keyboard from "../input/Keyboard";
import Level from "../levels/Level";
import Canvas2D from "./Canvas2D";
import Engine from "./Engine";
import GUI from "../GUI/GUI";

export default class Game {
  // Members
  private static instance: Game;
  private canvas2D: Canvas2D;
  private GUI: GUI;
  private player: Player;
  private keyboard: Keyboard;
  private level: Level;
  private engine: Engine;
  private characters: Map<string, Character> = new Map();
  private frames: number[] = [];
  private fps: number;

  // Constructor
  private constructor() {
    this.canvas2D = new Canvas2D();
    this.player = new Player(this.canvas2D);
    this.keyboard = new Keyboard();
    this.level = new Level(this.canvas2D);
    this.characters.set("Player", this.player);
    this.GUI = new GUI(this.canvas2D);

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
    this.calculateFPS();

    this.canvas2D.update();
    this.engine.update();

    switch (this.engine.gameState) {
      case "loading":
        this.GUI.showLoadingScreen();
        break;
      case "ready":
        this.level.update();
        this.updateCharacters();
        this.GUI.showStartScreen();
        break;
      case "running":
        this.level.update();
        this.updateCharacters();
        this.GUI.showFPS(this.fps);
        break;
      case "paused":
        this.level.update();
        this.updateCharacters();
        this.GUI.showPausedScreen();
        break;
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private calculateFPS(): void {
    const now = performance.now();
    while (this.frames.length > 0 && this.frames[0] <= now - 1000) {
      this.frames.shift();
    }
    this.frames.push(now);
    this.fps = this.frames.length;
  }

  private updateCharacters(): void {
    this.characters.forEach((character) => {
      character.update(this.engine.gameState);
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
