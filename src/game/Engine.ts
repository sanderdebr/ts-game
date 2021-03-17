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
  private notAtLevelStart(): boolean {
    return this.level.posX !== 0;
  }

  private notReachedLevelEnd(): boolean {
    return this.level.posX > -GAME_CONFIG.LEVEL_WIDTH;
  }

  private notReachedScreenEnd(): boolean {
    console.log(
      this.player.posX + this.player.width,
      this.canvas2D.width - GAME_CONFIG.SCREEN_MARGIN
    );
    return (
      this.player.posX + this.player.width <
      this.canvas2D.width - GAME_CONFIG.SCREEN_MARGIN
    );
  }

  private keyboardController(): void {
    if (this.keyboard.getKey(" ") && this.player.isOnGround()) {
      this.player.jump();
    }
    if (this.keyboard.getKey("ArrowLeft")) {
      if (this.player.posX > 0) {
        this.player.move("left");
      }
    }
    if (this.keyboard.getKey("ArrowRight")) {
      if (this.notReachedLevelEnd()) {
        if (this.notReachedScreenEnd()) {
          this.player.move("right");
          //this.level.move("right");
        }
      }
    }
  }

  private levelController(): void {}
}
