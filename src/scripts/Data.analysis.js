// FIXME: fix how sliceUtil determines how it navigates through a complex array structure
// or how it chooses which array to slice/ copy

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

// FIXME: rename this since it returns a boolean
function checkIfSimUtil(valA, valB) {
  const pctDiff = Math.abs((valA - valB) / valB);
  // check if its returning a float and is spazzing out cuz of it
  const isInRange = (pctDiff <= 0.3) && (pctDiff >= 0);
  return isInRange;
}

function rgbFreq(rgbArr) {
  const rgbFreqArr = rgbArr.reduce((arr2, item) => {
    if (arr2.length === 0) {
      arr2.push([item, 0]);
    } else {
      const currAvg = colorReduceUtil(item);
      const lastAvg = colorReduceUtil(arr2[arr2.length - 1]);

      const checkPct = checkIfSimUtil(currAvg, lastAvg);

      if (checkPct === true) {
        arr2[arr2.length - 1][1] += 1;
      } else {
        arr2.push([item, 1]);
      }
    }
    return arr2;
  }, []);
  return rgbFreqArr;
}

// TODO: check to make sure that the function is updating the end array
// refactor so that the function finds the most frequent colors, AFTER data reduction? (slower)

function findMost(rgbSorted) {
  const rgb = rgbSorted;

  // FIXME: break up the reduce callback into smaller functions
  const mostFrequent = rgb.reduce((acc, item) => {
    if (acc.length === 0) {
      acc = sliceUtil(item, acc);
      return acc;
    }
    if (acc.length === 1) {
      const currAvg = colorReduceUtil(item[0]);
      const lastAvg = colorReduceUtil(acc[0]);

      const checkPct = checkIfSimUtil(currAvg, lastAvg);

      if (checkPct === true) {
        acc = sliceUtil(item, acc, true);
      } else {
        acc = sliceUtil(item, acc);
      }
      return acc;
    }

    const currAvg = colorReduceUtil(item[0]);

    const isSimilar = acc.some((arr) => {
      const eleAvg = colorReduceUtil(arr[0]);

      const checkPct = checkIfSimUtil(currAvg, eleAvg);
      return checkPct;
    });


    if ((acc.length < 6) && (isSimilar === false)) {
      acc = sliceUtil(item, acc);
    } else if (acc.length === 6) {
      for (let j = 0; j === acc.length; j += 1) {
        const jAvg = colorReduceUtil(acc[j][0]);
        const toMerge = acc.findIndex((ele, k) => {
          if (j === k) { return false; }
          const eleAvg = colorReduceUtil(ele[0]);

          const checkPct = checkIfSimUtil(eleAvg, jAvg);
          return checkPct;
        });
        acc = sliceUtil(acc[j], acc, true, toMerge);
      }
      return acc;
    } else if (isSimilar === true) {
      // if similar & diff between biggest val inside [r,g,b] and small val isn't beyond expectation
      const toPop = acc.findIndex((val) => {
        const lastAvg = colorReduceUtil(val[0]);

        const checkPct = checkIfSimUtil(currAvg, lastAvg);
        return checkPct;
      });
      acc = sliceUtil(item, acc, true, toPop);
      return acc;
    }
    return acc;
  }, []);

  // console.log(mostFrequent);
  return mostFrequent;
}

function findClipping(arr) {
  const isWrongFormat = arr.some((val) => {
    if ((typeof val[0] !== 'string') || (Number.isInteger(val[1]) === false)) {
      return true;
    }
    return false;
  });
  if (isWrongFormat === true) {
    throw new Error(`
      Expecting input array with elements in the following format:
      ["number string", number]
    `);
  }
  const length = arr.reduce((acc, item) => {
    acc += item[1];
    return acc;
  }, 0);

  const quarterLength = getNthLength(arr, 0.25);
  const three4Length = getNthLength(arr, 0.75);

  const firstQuarter = arr.slice(0, quarterLength - 1);
  const lastQuarter = arr.slice(three4Length - 1, arr.length - 1);

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
  const blkClipPct = ((1 - ((length - blkClipSum) / length)) * 100).toFixed(2);
  const whtClipPct = ((1 - ((length - whtClipSum) / length)) * 100).toFixed(2);
  return [blkClipPct, whtClipPct];
}

export {
  getNthLength,
  colorReduceUtil,
  rgbFreq,
  findMost,
  findClipping,
  checkIfSimUtil,
};
