// Generate random number between x and y
export function randomRangeInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
