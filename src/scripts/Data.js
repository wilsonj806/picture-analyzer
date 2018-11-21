// TODO: import RGB2HSL ONLY from convert colors
import convert from '@csstools/convert-colors';

// TODO: Optimize image data sorting for performance
// TODO: Set a time out for array processing operations
// TODO: Model dynamic range by getting the mode of rgbArr and approximating a range???
// TODO: Set up the popular colors finder as an array with about 10 values or colors
// TODO: Set array values using setters and getters

class PixelData {
  constructor() {
    this.pixelData = [];
    this.rgbArr = [];
    this.rgbCount = [];
    this.hslArr = [];
    this.lightnessQty = [];
    this.pixelCount = undefined;
  }

  disposeArr() {
    this.pixelData = [];
    this.rgbArr = [];
    this.rgbCount = [];
    this.hslArr = [];
  }

  setPixels(context, width, height) {
    if (this.pixelData.width > 2) this.disposeArr();
    this.pixelData = context.getImageData(0, 0, width, height);
    return this;
  }

  parsePixels() {
    const pixels = this.pixelData;
    const l = pixels.data.length;
    for (let i = 0; i < l; i += 4) {
      const red = pixels.data[i + 0];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const entry = [].concat(red, green, blue); // can technically turn this into one line
      this.rgbArr.push(entry);
    }
    this.pixelCount = this.rgbArr.length;
    return this;
  }

  rgb2Hsl() {
    const pixels = this.pixelData;
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i + 0];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const converted = convert.rgb2hsl(red, green, blue).map((val) => {
        const roundedVal = Math.round(val);
        return roundedVal;
      });
      this.hslArr.push(converted[2]);
    }
    return this;
  }

  // move this

  getLightness() {
    const hsl = this.hslArr;
    const light = hsl.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
    const lightArr = Object.entries(light);
    this.lightnessQty = lightArr;
    return lightArr;
  }
}

export default PixelData;
