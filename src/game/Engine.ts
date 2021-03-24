import Character from "../characters/Character";
import Player from "../characters/Player";
import { GAME_CONFIG, LEVEL_BLUEPRINTS } from "../config";
import GUI from "../GUI/GUI";
import Keyboard from "../input/Keyboard";
import Level from "../levels/Level";
import { calculateFPS } from "../utils";
import Canvas2D from "./Canvas2D";

export default class Engine {
  // Members
  public gameState: string;
  private canvas2D: Canvas2D;
  private player: Player;
  private keyboard: Keyboard;
  private level: Level;
  private GUI: GUI;
  private characters: Map<string, Character>;

  private frames: number[] = [];
  private fps: number;

  private collisionMargin: number = 20;

  // Constructor
  constructor(
    characters: Map<string, Character>,
    canvas2D: Canvas2D,
    player: Player,
    keyboard: Keyboard,
    level: Level,
    GUI: GUI
  ) {
    this.gameState = "loading";
    this.characters = characters;
    this.canvas2D = canvas2D;
    this.player = player;
    this.keyboard = keyboard;
    this.level = level;
    this.GUI = GUI;

    this.start();
  }

  // Private methods
  private start(): void {
    this.level.generatePlatforms(LEVEL_BLUEPRINTS[this.player.level - 1]);
    this.level.generateMonsters(LEVEL_BLUEPRINTS[this.player.level - 1]);
  }

  private updateCharacters(): void {
    this.characters.forEach((character) => {
      character.update(this.gameState);
    });
  }

  // Public methods
  public update(): void {
    calculateFPS.call(this);
    this.gameStateController();
    this.collisionController();
    this.playerMovementController();
  }

  /*
    Game state controller
  */
  private allRenderablesAreLoaded(): boolean {
    return (
      this.player.loading === false &&
      this.level.loading === false &&
      this.level.platforms.filter((platform) => platform.loading === true)
        .length === 0 &&
      this.level.monsters.filter((monster) => monster.loading === true)
        .length === 0
    );
  }

  private gameStateController(): void {
    switch (this.gameState) {
      case "loading":
        this.GUI.showLoadingScreen();

        if (this.allRenderablesAreLoaded()) {
          this.gameState = "ready";
        }
        break;
      case "ready":
        this.level.update();
        this.updateCharacters();
        this.GUI.showStartScreen();

        if (this.keyboard.getKey("Enter")) {
          this.gameState = "running";
        }
        break;
      case "running":
        this.level.update();
        this.updateCharacters();
        this.GUI.showFPS(this.fps);
        this.GUI.showPlayerStats(
          this.player.level,
          this.player.coins,
          this.player.lives
        );

        if (this.player.lives === 0) {
          this.gameState = "lost";
        }

        if (this.keyboard.getKey("Escape")) {
          this.gameState = "paused";
        }
        break;
      case "paused":
        this.level.update();
        this.updateCharacters();
        this.GUI.showPausedScreen();

        if (this.keyboard.getKey("Enter")) {
          this.gameState = "running";
        }
        break;
      case "lost":
        this.GUI.showLostScreen();
        break;
    }
  }

  /*
    Player movement controller
  */
  private reachedLevelStart(): boolean {
    return this.level.posX >= 0;
  }

  private reachedLevelEnd(): boolean {
    return this.level.posX - this.canvas2D.width <= -this.level.width;
  }

  private reachedScreenStart(): boolean {
    return this.player.posX <= GAME_CONFIG.SCREEN_MARGIN;
  }

  private reachedScreenEnd(): boolean {
    return (
      this.player.posX + this.player.width >=
      this.canvas2D.width - GAME_CONFIG.SCREEN_MARGIN
    );
  }

  private playerMovementController(): void {
    if (this.gameState !== "running") {
      return;
    }

    if (
      this.keyboard.getKey(" ") &&
      (this.player.isOnGround() || this.player.isOnPlatform)
    ) {
      this.player.isOnPlatform = null;
      this.player.jump();
    }

    if (this.keyboard.getKey("ArrowLeft")) {
      if (!this.reachedScreenStart()) {
        this.player.move("left");
      }

      if (this.reachedScreenStart() && !this.reachedLevelStart()) {
        this.level.move("left");
      }
    }

    if (this.keyboard.getKey("ArrowRight")) {
      if (!this.reachedScreenEnd()) {
        this.player.move("right");
      }

      if (this.reachedScreenEnd() && !this.reachedLevelEnd()) {
        this.level.move("right");
      }
    }
  }

  /*
    Collision controller
  */
  private isOnTop(a: Player, b: any): boolean {
    return (
      (a.posY + a.height >= b.posY - this.collisionMargin &&
        a.posY + a.height <= b.posY + this.collisionMargin) ||
      a.posY + a.height === b.posY
    );
  }

  private detectCollision(a: Player, b: any, shiftX: number): boolean {
    return (
      a.posX + a.width >= b.posX - shiftX &&
      a.posX <= b.posX - shiftX + b.width &&
      a.posY + a.height >= b.posY &&
      a.posY <= b.posY + b.height
    );
  }

  private isNotTouchingAnything(): boolean {
    return (
      this.level.platforms.filter((platform) =>
        this.detectCollision(this.player, platform, this.level.shiftX)
      ).length === 0 &&
      this.level.monsters.filter((monster) =>
        this.detectCollision(this.player, monster, this.level.shiftX)
      ).length === 0
    );
  }

  private collisionController(): void {
    // Platforms
    this.level.platforms.forEach((platform) => {
      if (this.detectCollision(this.player, platform, this.level.shiftX)) {
        if (this.player.isOnPlatform === platform) return;
        if (this.isOnTop(this.player, platform)) {
          this.player.posY = platform.posY - this.player.height;
          this.player.isOnPlatform = platform;
        } else {
          this.player.isColliding = true;
        }
      }
    });

    // Monsters
    this.level.monsters.forEach((monster) => {
      if (this.detectCollision(this.player, monster, this.level.shiftX)) {
        this.player.isColliding = true;
        this.player.lives -= 1;
      }
    });

    if (this.isNotTouchingAnything()) {
      this.player.isColliding = false;
      this.player.isOnPlatform = null;
    }
  }
}
