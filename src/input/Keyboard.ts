import Player from "../characters/Player";
import GameObject from "../game/GameObject";

export default class Keyboard extends GameObject {
  // Members
  private keysPressed: boolean[] = [];

  // Constructor
  constructor() {
    super();
    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }

  // Public methods
  public isPressed(key: string): boolean {
    return this.keysPressed[key];
  }

  // Private methods
  private keyDown(e: KeyboardEvent): void {
    this.keysPressed[e.key] = true;
  }

  private keyUp(e: KeyboardEvent): void {
    this.keysPressed[e.key] = false;
  }
}
