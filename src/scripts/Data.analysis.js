
function sliceUtil(replacementArr, target, isOld, i) { // needs to be more complex;
  if ((isOld === true) && (target.length === 1)) {
    // everything's a reference so might need destructuring for data persistence
    // reinitialize target as const new = [...target]
    const reinit = [...target];
    const old = reinit.splice(0);
    console.log(old);
    const copy = [[...replacementArr[0]], replacementArr[1]];
    // slice is only grabbing the first rgb array
    copy[1] += old[0][1];

    reinit.push(copy);
    return reinit;
  }
  if (isOld === true) { // doesn't discriminate between similar and disimilar
    const reinit = [...target];
    console.log('hi');
    const old = reinit.splice(i, 1); // needs amending
    const copy = [[...replacementArr[0]], replacementArr[1]];
    copy[1] += old[0][1];

    reinit.push(copy);
    return reinit;
  }
  const reinit = [...target];
  const copy = [[...replacementArr[0]], replacementArr[1]];

  reinit.push(copy);
  return reinit;
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

      const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);

      if (((pctDiff <= 0.15) && (pctDiff >= 1.15))
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
// FIXME: Doesn't push qty in correctly, make sure it checks that the qty for the prev item exists

function initRgbFreq(accumulator, currentEntry) {
  // for use with Array.prototype.reduce()
  /* eslint-disable no-param-reassign */
  if (accumulator.length === 0) {
    accumulator = sliceUtil(currentEntry, accumulator, false, 0);
  }
  if (accumulator.length === 1) {
    const currSum = currentEntry[0].reduce((tot, item2) => {
      tot = item2 + tot;
      return tot;
    });
    const lastSum = accumulator[0][0].reduce((accumulator2, itm2) => {
      accumulator2 = itm2 + accumulator2;
      return accumulator2;
    });
    let currAvg = currSum / 3;
    let lastAvg = lastSum / 3;
    if (currAvg === 0) { currAvg = 1; }
    if (lastAvg === 0) { lastAvg = 1; }
    const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);

    const checkAvg = (
      (
        ((pctDiff < 1.15) && (pctDiff > 1.00)) || (pctDiff < 0.15)
      )
      || ((pctDiff === 1) && (currentEntry[1] > accumulator[0][1]))
    );

    if (checkAvg === true) { // if similar then splice out the old and put new in
      accumulator = sliceUtil(currentEntry, accumulator, true, 0);
    } else { // else just push a new entry in
      accumulator = sliceUtil(currentEntry, accumulator, false, 0);
    }
    /* eslint-enable no-param-reassign */
  }
  return accumulator;
}

function findMost(rgbSorted) {
  const rgb = rgbSorted;
  const mostFrequent = rgb.reduce((acc, item, i) => {
    if (i < 10) { console.log(acc); }
    initRgbFreq(acc, item);
    // redo the below, need way to increment everything up
    /*
      * Check if the quantity of the element is larger than an element in the table
      * Check if the element has a similar looking color in the table
    */

    /* eslint-disable no-param-reassign */
    const isHigher = acc.some((a) => {
      const proxy = a;
      return proxy[1] < item[1];
    });

    const currSum = item[0].reduce((tot, item2) => {
      tot = item2 + tot;
      return tot;
    });
    let currAvg = currSum / 3;
    if (currAvg === 0) { currAvg = 1; }

    const isSimilar = acc.some((a) => {
      const eleSum = a[0].reduce((sum, rgbVal) => {
        sum = rgbVal + sum;
        return sum;
      });
      let eleAvg = eleSum / 3;
      if (eleAvg === 0) { eleAvg = 1; }
      const pctDiff = Math.abs(((currAvg - eleAvg) / eleAvg));
      if (i < 30) { console.log(`this is eleSum ${eleSum}`); }
      return (((pctDiff < 1.15) && (pctDiff >= 1.00)) || (pctDiff < 0.15))
        || (currSum === eleAvg);
    });
    if (i < 30) {
      console.log(`
      this is isSimilar: ${isSimilar}
      this is isHigher: ${isHigher}
      this is currAvg: ${currAvg}
      `);
    }
    // FIXME: this is wrong, isHigher and isSimilar isn't doing the right thing
    // Also need a conditional for isHigher and length === 6
    // Also need a conditional for isSimilar
    if ((isHigher === true) && (isSimilar === true)) {
      const toPop = acc.findIndex((val) => {
        const lastSum = val[0].reduce((acc2, itm2) => {
          acc2 = itm2 + acc2;
          return acc2;
        });
        let lastAvg = lastSum / 3;
        if (lastAvg === 0) { lastAvg = 1; }
        const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);
        const checkSimilar = (((pctDiff < 1.15) && (pctDiff >= 1.00)) || (pctDiff < 0.15))
        || ((currSum === lastSum) && (item[1] > val[1]));
        return checkSimilar;
      });
      acc = sliceUtil(item, acc, true, toPop);
    } else if (acc.length < 6) {
      acc = sliceUtil(item, acc, false, 0);
    }
    /* eslint-enable no-param-reassign */
    return acc;
  }, []); /*
  mostFrequent.forEach((entry) => {
    entry.pop(entry[1]);
  }); */
  return mostFrequent;
}

export {
  sliceUtil,
  rgbFreq,
  findMost,
};
