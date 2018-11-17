// analyze pictures
import convert from '../../node_modules/@csstools/convert-colors';

const colorStats = document.querySelector('.btn--color-stats');
const clipping = document.querySelector('.btn--clipping');

// Should assign properties with prototype instead?
// TODO: Optimize image data sorting for performance
// TODO: Set a time out for array processing operations
// TODO: Set up the popular colors finder as an array with about 10 values or colors
// FIXME: Implement a rate limiter so that you can't just spam the buttons and soft-crash everything
// FIXME: Use constructors instead so you can use this instead of retyping Analyzer every time

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
    const sort = Analyzer.rgbArr.reduce((obj, item) => {
      /* eslint-disable no-param-reassign */
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item] += 1;
      return obj;
      /* eslint-enable no-param-reassign */
    }, {});
    const sortArr = Object.entries(sort); // Objects not meant to hold large amounts of data
    Analyzer.sortedRGB = sortArr;
  },
  findMost: () => { // determine way to compare with the rest of the accumulator
    const rgb = Analyzer.sortedRGB;
    function hasLowIndex(row) {
      return row[1] < this[1];
    }
    const most = rgb.reduce((acc, item, i) => {
      if (i < 10) console.log(acc.some(hasLowIndex, item));
      if (acc.length < 3) {
        acc.push(item);
      } else if (acc.some(hasLowIndex, item)) {
        acc.pop(); // pop out last value
        acc.push(item); // push new value
      }
      return acc;
    }, []);
    console.dir(most);
  },
  rgb2Hsl: () => {
    const pixels = Analyzer.imgPx;
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i + 0];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const converted = convert.rgb2hsl(red, green, blue).map((val) => {
        const roundedVal = Math.round(val);
        return roundedVal;
      });
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
    const lightArr = Object.entries(light);
    // console.dir(lightArr);
    Analyzer.convertCSV(lightArr);
  },
  convertCSV: (arr) => {
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
  },
};

// Event Listeners

colorStats.addEventListener('click', () => {
  Analyzer.parsePixels();
  Analyzer.sortRGB();
  Analyzer.findMost();
});

clipping.addEventListener('click', () => {
  Analyzer.rgb2Hsl();
  Analyzer.getLightness();
});

export default Analyzer;

/* package validation
console.log(convert.rgb2hsl(255, 255, 255));

*/
