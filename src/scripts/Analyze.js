// analyze pictures
import convert from '../../node_modules/@csstools/convert-colors';

const colorStats = document.querySelector('.btn--color-stats');

// Should assign properties with prototype instead?
const Analyzer = {
  imgPx: '',
  rgbArr: [],
  lastImg: '',
  // TODO: Implement the rest of this

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
};

/* package validation */
convert.rgb2hsl(100, 100, 100);

// Event Listeners

colorStats.addEventListener('click', () => {
  Analyzer.parsePixels();
  Analyzer.sortRGB();
  console.dir(Analyzer);
});

export default Analyzer;
