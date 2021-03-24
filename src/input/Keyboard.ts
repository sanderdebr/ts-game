export default class Keyboard {
  // Members
  private keysPressed: boolean[] = [];
  private active: boolean;

  // Constructor
  constructor() {
    this.active = false;
    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }

  // Private methods
  private keyDown(e: KeyboardEvent): void {
    this.keysPressed[e.key] = this.active && true;
  }

  private keyUp(e: KeyboardEvent): void {
    this.keysPressed[e.key] = this.active && false;
  }

  // Getters and setters
  public getKey(key: string): boolean {
    return this.keysPressed[key];
  }

  public setActive(bool: boolean) {
    this.active = bool;
  }
}
