import Player from "../characters/Player";
import { GAME_CONFIG } from "../config";
import Keyboard from "../input/Keyboard";
import Level from "../levels/Level";
import Canvas2D from "./Canvas2D";

export default class Engine {
  private canvas2D: Canvas2D;
  private player: Player;
  private keyboard: Keyboard;
  private level: Level;

  constructor(
    canvas2D: Canvas2D,
    player: Player,
    keyboard: Keyboard,
    level: Level
  ) {
    this.canvas2D = canvas2D;
    this.player = player;
    this.keyboard = keyboard;
    this.level = level;
  }

  update(): void {
    this.keyboardController();
    this.levelController();
  }

  // Private methods
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

  private keyboardController(): void {
    if (this.keyboard.getKey(" ") && this.player.isOnGround()) {
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

  private levelController(): void {
    this.level.platforms.forEach((platform) => {
      // console.log(platorm);
    });
  }
}
