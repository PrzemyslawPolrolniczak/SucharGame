import { options } from './options';

const { windowHeight, windowWidth, boundryErrorMargin } = options

export const setRandomCords = (): number[] => {
    let x: number = Math.floor(Math.random() * windowWidth);
    let y: number = Math.floor(Math.random() * windowHeight);

    if (x >= windowWidth - boundryErrorMargin) {
      x -= boundryErrorMargin;
    } else if (x <= boundryErrorMargin) {
      x += boundryErrorMargin;
    }

    if (y >= windowHeight - boundryErrorMargin) {
      y -= boundryErrorMargin;
    } else if (y <= boundryErrorMargin) {
      y += boundryErrorMargin;
    }

    console.log([x, y])

    return [x, y];
  }