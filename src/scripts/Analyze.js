// analyze pictures
import convert from '../../node_modules/@csstools/convert-colors';

// TODO: Optimize image data sorting for performance
// TODO: Set a time out for array processing operations
// TODO: Set up the popular colors finder as an array with about 10 values or colors

class AnalyzeImg {
  constructor() {
    this.pixelData = [];
    this.rgbArr = [];
    this.sortedRgb = [];
    this.hslArr = [];
    this.lightnessQty = [];
    this.pixelCount = undefined;
  }

  resetArr() {
    this.pixelData = [];
    this.rgbArr.splice(0, this.rgbArr.length);
  }

  setPixels(context, width, height) {
    if (this.pixelData.width > 2) this.resetArr();
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
    console.log(this.pixelCount);
    return this;
  }

  sortRgb() {
    const sort = this.rgbArr.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
    const sortArr = Object.entries(sort); // Objects not meant to hold large amounts of data
    this.sortedRgb = sortArr;
    return this;
  }

  // TODO: Implement the reduceer in a way so that you end up with 6 entries and the incoming
  // entry is compared against each existing entry before determining if something should be removed
  findMost() {
    const rgb = this.sortedRgb;
    function hasLowIndex(row) {
      return row[1] < this[1];
    }
    const most = rgb.reduce((acc, item) => {
      // if (i < 10) console.log(acc.some(hasLowIndex, item));
      if (acc.length < 3) {
        acc.push(item[0]);
      } else if (acc.some(hasLowIndex, item)) {
        acc.pop(); // pop out last value
        acc.push(item[0]); // push new rgb value
      }
      return acc;
    }, []);
    console.dir(most);
    return most;
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
      this.hslArr.push(converted);
    }
    return this;
  }

  getLightness() {
    const hsl = this.hslArr;
    const light = hsl.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item[2]]) {
        obj[item[2]] = 0;
      }
      obj[item[2]] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
    const lightArr = Object.entries(light);
    this.lightnessQty = lightArr;
    return lightArr;
  }
}

export default AnalyzeImg;
