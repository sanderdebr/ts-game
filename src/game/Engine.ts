import Player from "../characters/Player";
import { GAME_CONFIG } from "../config";
import Keyboard from "../input/Keyboard";
import Level from "../levels/Level";
import Canvas2D from "./Canvas2D";

export default class Engine {
  // Members
  private canvas2D: Canvas2D;
  private player: Player;
  private keyboard: Keyboard;
  private level: Level;
  private collisionMargin: number = 20;

  public gameState: string;

  // Constructor
  constructor(
    canvas2D: Canvas2D,
    player: Player,
    keyboard: Keyboard,
    level: Level
  ) {
    this.gameState = "loading";
    this.canvas2D = canvas2D;
    this.player = player;
    this.keyboard = keyboard;
    this.level = level;
  }

  update(): void {
    this.gameStateController();
    this.collisionController();
    this.playerMovementController();
  }

  /*
    Game state controller
  */

  private everythingIsLoaded(): boolean {
    return (
      this.player.loading === false &&
      this.level.loading === false &&
      this.level.platforms.filter((platform) => platform.loading === true)
        .length === 0
    );
  }

  private gameStateController(): void {
    if (this.gameState === "loading" && this.everythingIsLoaded()) {
      this.gameState = "ready";
    }
    if (this.gameState === "ready" || this.gameState === "paused") {
      if (this.keyboard.getKey("Enter")) {
        this.gameState = "running";
      }
    }
    if (this.gameState === "running") {
      if (this.keyboard.getKey("Escape")) {
        this.gameState = "paused";
      }
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

  private isNotTouchingAnyPlatform(): boolean {
    return (
      this.level.platforms.filter((platform) =>
        this.detectCollision(this.player, platform, this.level.shiftX)
      ).length === 0
    );
  }

  private collisionController(): void {
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

    if (this.isNotTouchingAnyPlatform()) {
      this.player.isColliding = false;
      this.player.isOnPlatform = null;
    }
  }
}
