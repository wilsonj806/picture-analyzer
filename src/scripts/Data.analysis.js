// TODO: replace all of the const currSum and const lastSum functions with a function

function sliceUtil(replacementArr, target, isOld = false, i = 0) {
  if ((isOld === true) && (target.length === 1)) {
    const reinit = [...target];
    const old = reinit.splice(0);
    const copy = [[...replacementArr[0]], replacementArr[1]];

    copy[1] += old[0][1];

    reinit.push(copy);
    return reinit;
  }
  if (isOld === true) {
    console.log(replacementArr);
    const reinit = [...target];
    const old = reinit.splice(i, 1);
    const copy = [[...replacementArr[0]], replacementArr[1]];
    copy[1] += old[0][1];

    reinit.push(copy);
    return reinit;
  }
  const reinit = [...target];
  const copy = [[...replacementArr[0]], replacementArr[1]];
  copy[1] = 1;
  reinit.push(copy);
  return reinit;
}

/* eslint-disable no-param-reassign */
function colorReduceUtil(arr) {
  // Function gets an average
  const sum = arr.reduce((acc, item) => {
    acc += item;
    return acc;
  });
  let average = sum / 3;
  if (average === 0) { average = 15; } // if its rgb(0, 0, 0) then set the average to 1
  return average;
}
/* eslint-enable no-param-reassign */

function rgbFreq(rgbArr) {
  /* eslint-disable no-param-reassign */
  const rgbFreqArr = rgbArr.reduce((arr2, item) => {
    if (arr2.length === 0) {
      arr2.push([item, 0]);
    } else {
      const currAvg = colorReduceUtil(item);
      const lastAvg = colorReduceUtil(arr2[arr2.length - 1]);

      // split the computation for the below into a new function?
      const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);

      if (((pctDiff <= 0.15) && (pctDiff >= 1.15))
          || (currAvg === lastAvg)) {
        arr2[arr2.length - 1][1] += 1;
      } else {
        arr2.push([item, 1]);
      }
    }
    return arr2;
  }, []);
  /* eslint-enable no-param-reassign */
  console.log(rgbFreqArr);
  return rgbFreqArr;
}

// FIXME: Doesn't push qty in correctly, make sure it checks that the qty for the prev item exists
// FIXME: Rename the below function

function initReduceRgbFreq(acc, item) {
  // for use with Array.prototype.reduce()
  /* eslint-disable no-param-reassign */
  if (acc.length === 0) {
    acc = sliceUtil(item, acc);
  }
  if (acc.length === 1) {
    const currAvg = colorReduceUtil(item[0]);
    const lastAvg = colorReduceUtil(acc[0]);

    const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);

    const checkAvg = (
      (((pctDiff < 1.15) && (pctDiff > 1.00)) || (pctDiff < 0.15))
      || ((pctDiff === 1) && (item[1] > acc[0][1]))
    );

    if (checkAvg === true) {
      acc = sliceUtil(item, acc, true);
    } else {
      acc = sliceUtil(item, acc);
    }
    /* eslint-enable no-param-reassign */
  }
  return acc;
}

function findMost(rgbSorted) {
  const rgb = rgbSorted;
  const mostFrequent = rgb.reduce((acc, item, i) => {
    initReduceRgbFreq(acc, item);
    /* eslint-disable no-param-reassign */
    const isHigher = acc.some((a) => {
      const proxy = a;
      let conditional = proxy[1] < item[1];
      if (proxy[1] === item[1]) { conditional = false; }
      return conditional;
    });
    const currAvg = colorReduceUtil(item[0]);

    const isSimilar = acc.some((arr) => {
      const eleAvg = colorReduceUtil(arr[0]);

      const pctDiff = Math.abs(((currAvg - eleAvg) / eleAvg));
      if (i < 30) {
        console.log(`
        this is accRgb ${acc[0]}
        this is currRgb ${item[0]}
        this is eleAvg ${eleAvg}
        this is currAvg: ${currAvg}
        this is pctDiff ${pctDiff}
        `);
      }

      return (
        ((pctDiff <= 1.15) && (pctDiff >= 1.00)) || (pctDiff <= 0.15))
        || (currAvg === eleAvg);
    });
    if (i < 30) {
      console.log(`
      this is isSimilar: ${isSimilar}
      this is isHigher: ${isHigher}
      `);
    }
    // FIXME: this is wrong, isHigher and isSimilar isn't doing the right thing
    // FIXME: consolidate variable names so you don't have 50 different names for the same thing
    // Also need a conditional for isHigher and length === 6
    // Also need a conditional for isSimilar

    if ((acc.length < 6) && (isSimilar === false)) {
      acc = sliceUtil(item, acc, false, 0);
    } else if (acc.length === 6) {
      // check if values inside are similar to each other
      const l = acc.length;
      for (let j = 0; j === l; j += 1) {
        const jAvg = colorReduceUtil(acc[j][0]);

        // now check if any other thing is similar
        const toMerge = acc.findIndex((ele) => {
          // amend the below to use the new colorReduceUtil()
          const eleAvg = colorReduceUtil(ele[0]);

          const pctDiff = Math.abs(((jAvg - eleAvg) / eleAvg));

          const isGreater = (pctDiff <= 1.15) && (pctDiff > 1.00);
          const isLower = (pctDiff <= 0.15);
          const checkSimilar = (isGreater || isLower);
          // console.log(checkSimilar);
          return checkSimilar;
        });
        // console.log(toMerge);
        if (toMerge >= 0) {
          console.log('merging');
          acc = sliceUtil(acc[j], acc, true, toMerge);
        }
      }
    } else if ((isSimilar === true)) {
      const toPop = acc.findIndex((val) => {
        const lastAvg = colorReduceUtil(val[0]);

        const pctDiff = Math.abs((currAvg - lastAvg) / lastAvg);

        const isGreater = (pctDiff <= 1.15) && (pctDiff >= 1.00);
        const isLower = (pctDiff <= 0.15);
        const checkSimilar = (isGreater || isLower) || (lastAvg === currAvg);

        return checkSimilar;
      });
      acc = sliceUtil(item, acc, true, toPop); // replace by incrementing acc[toPop][1] up by item[1]?
      console.log('popping');
    } else if (isHigher === true) {
      acc.sort((a, b) => {
        if (a[1] < b[1]) {
          return -1;
        }
        if (a[1] > b[1]) {
          return 1;
        }
        return 0;
      });
      acc = sliceUtil(item, acc, true);
    }
    /* eslint-enable no-param-reassign */
    return acc;
  }, []);
  // FIXME: uncomment when deploying to production
  /*
  mostFrequent.forEach((entry) => {
    entry.pop(entry[1]);
  });
  */
  console.log(mostFrequent);
  return mostFrequent;
}

export {
  sliceUtil,
  rgbFreq,
  findMost,
};
