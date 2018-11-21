function sliceUtil(arr, target) { // needs to be more complex;
  const copy = arr.slice();
  target.push(copy);
}

function rgbFreq(rgbArr) {
  /* eslint-disable no-param-reassign */
  const rgbFreqArr = rgbArr.reduce((arr2, item) => {
    // if (i < 3) { console.dir(arr2); } // breaks when you analyze IMGP5890.jpg
    if (arr2.length === 0) {
      arr2.push([item, 0]);
    } else {
      const currSum = item.reduce((acc, item2) => {
        acc = item2 + acc;
        return acc;
      });
      const lastSum = arr2[arr2.length - 1][0].reduce((acc2, itm2) => {
        acc2 = itm2 + acc2;
        return acc2;
      });
      let currAvg = currSum / 3;
      let lastAvg = lastSum / 3;
      if (currAvg === 0) { currAvg = 1; }
      if (lastAvg === 0) { lastAvg = 1; }

      if ((((currAvg / lastAvg) < 1.25) && ((currAvg / lastAvg) > 0.75))
          || (currSum === lastSum)) {
        arr2[arr2.length - 1][1] += 1;
      } else {
        arr2.push([item, 1]);
      }
    }
    return arr2;
  }, []);
  /* eslint-enable no-param-reassign */
  return rgbFreqArr;
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

function findMost(rgbSorted) {
  const rgb = rgbSorted;
  const mostFrequent = rgb.reduce((acc, item) => {
    if (acc.length === 0) {
      const copy = item.slice();
      acc.push(copy);
      return acc;
    }
    if (acc.length < 6) {
      /* eslint-disable no-param-reassign */
      const currSum = item[0].reduce((tot, item2) => {
        tot = item2 + tot;
        return tot;
      });
      const lastSum = acc[0][0].reduce((acc2, itm2) => {
        acc2 = itm2 + acc2;
        return acc2;
      });
      let currAvg = currSum / 3;
      let lastAvg = lastSum / 3;
      if (currAvg === 0) { currAvg = 1; }
      if (lastAvg === 0) { lastAvg = 1; }
      const pct = currAvg / lastAvg;

      const checkAvg = ((pct > 0.63)
                || ((currSum === lastSum) && (item[1] > acc[0][1])));
      console.log(`
      this is checkAvg: ${checkAvg}
      this is pct: ${pct}
      this is currAvg: ${currAvg}
      this is lastAvg: ${lastAvg}
      `);
      if (checkAvg === true) {
        const old = acc.splice(0, 1);
        const copy = item.slice();
        copy[1] = item[1] + old[1];

        acc.push(copy);
      } else {
        const copy = item.slice();
        acc.push(copy);
      }
      console.log(acc);
      /* eslint-enable no-param-reassign */
    } else { // redo this, need way to increment everything up
      const toPop = acc.findIndex((val) => {
        /* eslint-disable no-param-reassign */
        const currSum = item.reduce((tot, item2) => {
          tot = item2 + tot;
          return tot;
        });
        const lastSum = val[0].reduce((acc2, itm2) => {
          acc2 = itm2 + acc2;
          return acc2;
        });
        let currAvg = currSum / 3;
        let lastAvg = lastSum / 3;
        if (currAvg === 0) { currAvg = 1; }
        if (lastAvg === 0) { lastAvg = 1; }

        return ((((currAvg / lastAvg) < 1.25) && ((currAvg / lastAvg) > 0.75))
                || (currSum === lastSum)) && (item[1] > val[1]);
        /* eslint-enable no-param-reassign */
      });
      const old = acc.splice(toPop, 1);
      const copy = item.slice();
      copy[1] = item[1] + old[1];

      acc.push(copy); // push new rgb value
    }
    return acc;
  }, []);
  mostFrequent.forEach((entry) => {
    entry.pop(entry[1]);
  });
  return mostFrequent;
}

export {
  sliceUtil,
  rgbFreq,
  findMost,
};
