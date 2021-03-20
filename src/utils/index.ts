// Generate random number between x and y
export function randomRangeInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Image loader, promise wrapper around image.onload()
export function imageLoader(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
