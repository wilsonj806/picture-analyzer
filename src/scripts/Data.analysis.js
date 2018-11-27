function getNthLength(arr, n) {
  const nthLength = Math.round(arr.length * n);
  return nthLength;
}

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
function colorReduceUtil(arr, isNested = false, i = 0) {
  // ONLY WORKS ON SINGLE LAYER ARRAYS OR AT MOST 2 LAYERS(i.e [1,2,3,4] or [[1,2], [3,4]])
  if (isNested === true) {
    const sum = arr.reduce((acc, item) => {
      if (item === null) {
        return acc;
      }
      acc += item[i];
      return acc;
    }, 0);
    let average = sum / arr.length;
    if (average < 15) { average = 15; }
    return average;
  }
  const sum = arr.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);
  let average = sum / arr.length;
  if (average < 15) { average = 15; }
  return average;
}
/* eslint-enable no-param-reassign */

function pctDiffUtil(valA, valB) {
  const pctDiff = Math.abs((valA - valB) / valB);
  const isGreater = (pctDiff <= 1.2) && (pctDiff > 1.00);
  const isLower = (pctDiff <= 0.2);
  const checkSimilar = (isGreater || isLower);
  return checkSimilar;
}

function rgbFreq(rgbArr) {
  /* eslint-disable no-param-reassign */
  const rgbFreqArr = rgbArr.reduce((arr2, item) => {
    if (arr2.length === 0) {
      arr2.push([item, 0]);
    } else {
      const currAvg = colorReduceUtil(item);
      const lastAvg = colorReduceUtil(arr2[arr2.length - 1]);

      const checkPct = pctDiffUtil(currAvg, lastAvg);

      if (checkPct === true) {
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

function initReduceRgbFreq(acc, item) {
  // for use with Array.prototype.reduce()
  /* eslint-disable no-param-reassign */
  if (acc.length === 0) {
    acc = sliceUtil(item, acc);
  }
  if (acc.length === 1) {
    const currAvg = colorReduceUtil(item[0]);
    const lastAvg = colorReduceUtil(acc[0]);

    const checkPct = pctDiffUtil(currAvg, lastAvg);

    if (checkPct === true) {
      acc = sliceUtil(item, acc, true);
    } else {
      acc = sliceUtil(item, acc);
    }
    /* eslint-enable no-param-reassign */
  }
  return acc;
}

// TODO: check to make sure that the function is updating the end array
// refactor so that the function finds the most frequent colors, AFTER data reduction? (slower)

function findMost(rgbSorted) {
  const rgb = rgbSorted;
  // console.log(rgb);
  const quarterLength = getNthLength(rgb, 0.25);
  const halfLength = getNthLength(rgb, 0.5);
  const three4Length = getNthLength(rgb, 0.75);

  const mostFrequent = rgb.reduce((acc, item, i) => {
    initReduceRgbFreq(acc, item);
    /* eslint-disable no-param-reassign */
    const currAvg = colorReduceUtil(item[0]);

    const isSimilar = acc.some((arr) => {
      const eleAvg = colorReduceUtil(arr[0]);

      const checkPct = pctDiffUtil(currAvg, eleAvg);
      /*
      if (i < 30) {
        console.log(`
        this is accRgb ${acc[0]}
        this is currRgb ${item[0]}
        this is eleAvg ${eleAvg}
        this is currAvg: ${currAvg}
        `);
      }
      */
      return checkPct;
    });
    /*
    if (i < 30) { console.log(`this is isSimilar: ${isSimilar}`); }
    */

    if ((acc.length < 6) && (isSimilar === false)) {
      acc = sliceUtil(item, acc);
    } else if ((acc.length === 6) || (i === halfLength)) {
      for (let j = 0; j === acc.length; j += 1) {
        const jAvg = colorReduceUtil(acc[j][0]);
        const toMerge = acc.findIndex((ele) => {
          const eleAvg = colorReduceUtil(ele[0]);

          const checkPct = pctDiffUtil(eleAvg, jAvg);
          return checkPct;
        });
        acc = sliceUtil(acc[j], acc, true, toMerge);
      }
      return acc;
    } else if (isSimilar === true) {
      // if similar & diff between biggest val inside [r,g,b] and small val isn't beyond expectation
      const toPop = acc.findIndex((val) => {
        const lastAvg = colorReduceUtil(val[0]);

        const checkPct = pctDiffUtil(currAvg, lastAvg);
        return checkPct;
      });
      acc = sliceUtil(item, acc, true, toPop);
      return acc;
    } else if ((i === halfLength) || (i === quarterLength) || (i === three4Length)) {
      acc.sort((a, b) => {
        if (a[1] < b[1]) { return 1; }
        if (a[1] > b[1]) { return -1; }
        return 0;
      });
      if (acc[0][1] <= 1) {
        acc.shift();
      }
    }
    /* eslint-enable no-param-reassign */
    return acc;
  }, []);

  // console.log(mostFrequent);
  return mostFrequent;
}

function findClipping(arr, length) {
  const reinit = [...arr];

  const quarterLength = getNthLength(reinit, 0.25);
  const three4Length = getNthLength(reinit, 0.75);

  const firstQuarter = reinit.slice(0, quarterLength - 1);
  const lastQuarter = reinit.slice(three4Length - 1, reinit.length - 1);

  const firstDiffs = firstQuarter.map((val, i) => {
    if (i === (firstQuarter.length - 1)) { return null; }
    const deltaPair = [firstQuarter[i + 1][0], val[0]];

    const diff = Math.abs(firstQuarter[i + 1][1] - val[1]);
    return [i, deltaPair, diff];
  });

  const lastDiffs = lastQuarter.map((val, i) => {
    if (i === (lastQuarter.length - 1)) { return null; }
    const deltaPair = [lastQuarter[i + 1][0], val[0]];

    const diff = Math.abs(lastQuarter[i + 1][1] - val[1]);
    return [i, deltaPair, diff];
  });

  const firstAvg = colorReduceUtil(firstDiffs, true, 2);
  const lastAvg = colorReduceUtil(lastDiffs, true, 2);

  const blkClip = firstDiffs.filter((val) => {
    if (val === null) { return false; }
    const check = val[2] > (firstAvg * 2);
    return check;
  });
  const whtClip = lastDiffs.filter((val) => {
    if (val === null) { return false; }
    const check = val[2] > (lastAvg * 2);
    return check;
  });

  const blkClipSum = colorReduceUtil(blkClip, true, 2);
  const whtClipSum = colorReduceUtil(whtClip, true, 2);
  const blkClipStr = `This is percent of black clipping: ${((1 - ((length - blkClipSum) / length)) * 100).toFixed(2)} %`;
  const whtClipStr = `This is percent of white clipping: ${((1 - ((length - whtClipSum) / length)) * 100).toFixed(2)} %`;
  return [blkClipStr, whtClipStr];
}

export {
  rgbFreq,
  findMost,
  findClipping,
};
