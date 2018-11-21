// TODO: import RGB2HSL ONLY from convert colors
import convert from '../../node_modules/@csstools/convert-colors';

// TODO: Optimize image data sorting for performance
// TODO: Set a time out for array processing operations
// TODO: Model dynamic range by getting the mode of rgbArr and approximating a range???
// TODO: Set up the popular colors finder as an array with about 10 values or colors

class AnalyzeImg {
  constructor() {
    this.pixelData = [];
    this.rgbArr = [];
    this.rgbCount = [];
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
    return this;
  }

  rgbFreq() {
    /* eslint-disable no-param-reassign */
    const sortArr = this.rgbArr.reduce((arr2, item, i) => {
      if (i < 3) { console.dir(arr2); }
      if (arr2.length === 0) {
        arr2.push([item, 0]); // this needs to be more complex, should be [item, val];
      } else {
        let currSum = item.reduce((acc, item2) => {
          acc = item2 + acc;
          return acc;
        });
        let lastSum = arr2[arr2.length - 1][0].reduce((acc2, itm2) => {
          acc2 = itm2 + acc2;
          return acc2;
        });
        if (currSum === 0) { currSum = 1; }
        if (lastSum === 0) { lastSum = 1; }

        if ((((currSum / lastSum) < 1.25) && ((currSum / lastSum) > 0.75))
            || (currSum === lastSum)) {
          arr2[arr2.length - 1][1] += 1;
        } else {
          arr2.push([item, 1]);
        }
      }
      return arr2;
    }, []);
    /* eslint-enable no-param-reassign */
    console.log(sortArr);
    this.rgbCount = sortArr;
    return this;
  }

  // TODO: Implement the reducer in a way so that you end up with 6 entries and the incoming
  // entry is compared against each existing entry before determining if something should be removed
  /*
    * Alternative to modeling the dynamic range of an image:
      * Sort the array by frequency
      * Pick 15 of the most frequent
      * Narrow it down to 6 based on if there are colors that are very close to each other
      *
      * Or:
      * Split the array in two
      * Get the first 20 colors that are most frequent in both
      * Reduce the sample down to 6 from there
  */
  findMost() {
    const rgb = this.rgbCount;
    function hasLowIndex(row) { // this is callback fn for Array.prototype.sort()
      return row[1] < this[1];
    }
    const mostFrequent = rgb.reduce((acc, item) => {
      // if (i < 10) console.log(acc.some(hasLowIndex, item));
      if (acc.length < 3) {
        acc.push([item[0], item[1]]);
      } else if (acc.some(hasLowIndex, item)) {
        const toPop = acc.findIndex((val) => {
          /* eslint-disable no-param-reassign */
          let currSum = item.reduce((tot, item2) => {
            tot = item2 + tot;
            return tot;
          });
          let lastSum = val[0].reduce((acc2, itm2) => {
            acc2 = itm2 + acc2;
            return acc2;
          });
          if (currSum === 0) { currSum = 1; }
          if (lastSum === 0) { lastSum = 1; }

          return ((((currSum / lastSum) < 1.25) && ((currSum / lastSum) > 0.75))
                  || (currSum === lastSum)) && (item[1] > val[1]);
          /* eslint-enable no-param-reassign */
        });
        acc.splice(toPop, 1);
        acc.push([item[0], item[1]]); // push new rgb value
      }
      return acc;
    }, []);
    mostFrequent.forEach((entry) => {
      entry.pop(entry[1]);
    });
    console.log(mostFrequent);
    return mostFrequent;
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
