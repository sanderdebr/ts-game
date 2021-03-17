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
  private keyboardController(): void {
    if (this.keyboard.getKey(" ") && this.player.isOnGround()) {
      this.player.jump();
    }

    if (this.keyboard.getKey("ArrowLeft")) {
      const notReachedLevelStart = this.level.posX !== 0;

      const notReachedScreenStart =
        this.player.posX > GAME_CONFIG.SCREEN_MARGIN;

      if (notReachedLevelStart) {
        if (notReachedScreenStart) {
          this.player.move("left");
        }
        this.level.move("left");
      }
    }

    if (this.keyboard.getKey("ArrowRight")) {
      const notReachedLevelEnd =
        this.level.posX - this.canvas2D.width > -this.level.width;

      const notReachedScreenEnd =
        this.player.posX + this.player.width <
        this.canvas2D.width - GAME_CONFIG.SCREEN_MARGIN;

      if (notReachedLevelEnd) {
        if (notReachedScreenEnd) {
          this.player.move("right");
        }
        this.level.move("right");
      }
    }
  }

  private levelController(): void {}
}
