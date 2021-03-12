import Entity from "./Entity";

export default class Player extends Entity {
  constructor(image: string) {
    super(image);
    this.image.src = image;
  }
}
