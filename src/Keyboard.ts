export default class Keyboard {
  // Members
  private keysPressed: boolean[] = [];

  // Constructor
  constructor() {
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
