class Keyboard {
  // Members
  _keysPressed: boolean[] = [];

  // Constructor
  constructor() {
    document.addEventListener("keydown", (e) => this.keyPressed(e));
  }

  // Private methods
  private keyPressed(e: KeyboardEvent): void {
    this._keysPressed[e.keyCode] = true;
  }
}

export const keyboard = new Keyboard();
