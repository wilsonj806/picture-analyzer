// analyze pictures
import convert from '../../node_modules/@csstools/convert-colors';

// TODO: Optimize image data sorting for performance
// TODO: Set a time out for array processing operations
// TODO: Set up the popular colors finder as an array with about 10 values or colors
// FIXME: Implement a rate limiter so that you can't just spam the buttons and soft-crash everything
// FIXME: Set up a reset for when you have new images uploaded

class AnalyzeImg {
  constructor() {
    this.pixelData = [];
    this.rgbArr = [];
    this.sortedRGB = [];
    this.hslArr = [];
  }

  resetArr() {
    this.pixelData = [];
    this.rgbArr.splice(0, this.rgbArr.length);
  }

  setPixels(context, width, height) {
    if (this.pixelData.width > 2) this.resetArr();
    this.pixelData = context.getImageData(0, 0, width, height);
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
    console.dir(this.rgbArr);
    return this;
  }

  sortRGB() {
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
    this.sortedRGB = sortArr;
    return this;
  }

  findMost() { // determine way to compare with the rest of the accumulator
    const rgb = this.sortedRGB;
    function hasLowIndex(row) {
      return row[1] < this[1];
    }
    const most = rgb.reduce((acc, item) => {
      // if (i < 10) console.log(acc.some(hasLowIndex, item));
      if (acc.length < 3) {
        acc.push(item);
      } else if (acc.some(hasLowIndex, item)) {
        acc.pop(); // pop out last value
        acc.push(item); // push new value
      }
      return acc;
    }, []);
    console.dir(most);
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
    console.dir(lightArr);
    // this.convertCSV(lightArr);
    return this;
  }

  convertCSV(arr) {
    let csv = 'Lightness \n';
    csv += 'light val, count \n';
    arr.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });
    const newEle = document.createElement('a');
    newEle.href = `data:text/csv;charset=utf-8, ${encodeURI(csv)}`;
    newEle.target = '_blank';
    newEle.download = 'data.csv';
    newEle.click();
    return this;
  }
}

export default AnalyzeImg;
