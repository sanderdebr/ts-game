export default class Keyboard {
  // Members
  private keysPressed: boolean[] = [];

  // Constructor
  constructor() {
    document.addEventListener("keydown", (e) => this.keyDown(e));
    document.addEventListener("keyup", (e) => this.keyUp(e));
  }

  // Private methods
  private keyDown(e: KeyboardEvent): void {
    this.keysPressed[e.key] = true;
  }

  private keyUp(e: KeyboardEvent): void {
    this.keysPressed[e.key] = false;
  }

  // Public methods
  public getKey(key: string): boolean {
    return this.keysPressed[key];
  }
}
