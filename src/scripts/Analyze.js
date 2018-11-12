// analyze pictures
import convert from '../../node_modules/@csstools/convert-colors';

const colorStats = document.querySelector('.btn--color-stats');
const clipping = document.querySelector('.btn--clipping');

// Should assign properties with prototype instead?
// TODO: Optimize image data sorting for performance
// FIXME: Implement a reset so that data gets updated.
const Analyzer = {
  imgPx: '',
  lastImg: '',
  rgbArr: [],
  sortedRGB: [],
  hslArr: [],

  setPixels: (context, width, height) => {
    Analyzer.imgPx = context.getImageData(0, 0, width, height);
  },
  parsePixels: () => {
    const pixels = Analyzer.imgPx;
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i + 0];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const entry = [];
      entry.push(red);
      entry.push(green);
      entry.push(blue);
      Analyzer.rgbArr.push(entry);
    }
  },
  // TODO: refactor so that it accepts any input array and outputs the corresponding sorted around
  sortRGB: () => {
    const rgb = Analyzer.rgbArr;
    Analyzer.sortedRGB = rgb.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
  },
  rgb2Hsl: () => {
    const pixels = Analyzer.imgPx;
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i + 0];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      /* eslint-disable no-param-reassign, no-unused-vars */
      const converted = convert.rgb2hsl(red, green, blue).map((val) => {
        val = Math.round(val);
        return val;
      });

      /* eslint-enable no-param-reassign, no-unused-vars */
      Analyzer.hslArr.push(converted);
    }
  },
  getLightness: () => {
    const hsl = Analyzer.hslArr;
    const light = hsl.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item[2]]) {
        obj[item[2]] = 0;
      }
      obj[item[2]] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
    Analyzer.convertCSV(light);
    // TODO: Sort the new array, and download it
  },
  convertCSV: (obj) => {
    let csv = 'light val, count \n';
    const objArr = Object.keys(obj).map((key) => {
      const num = Number(key);
      const val = obj[key];
      return [num, val];
    });
    objArr.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });
    const newEle = document.createElement('a');
    newEle.href = `data:text/csv;charset=utf-8, ${encodeURI(csv)}`;
    newEle.target = '_blank';
    newEle.download = 'data.csv';
    newEle.click();
  },
};

// Event Listeners

colorStats.addEventListener('click', () => {
  Analyzer.parsePixels();
  Analyzer.sortRGB();
});

clipping.addEventListener('click', () => {
  Analyzer.rgb2Hsl();
  Analyzer.getLightness();
});

export default Analyzer;

/* package validation
console.log(convert.rgb2hsl(255, 255, 255));

*/
