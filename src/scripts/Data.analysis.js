function getNthLength(arr, n) {
  const nthLength = Math.round(arr.length * n);
  return nthLength;
}

// TODO: Rename this, its not a great name
function spliceUtil(replacementArr, target, isOld = false, i = 0) {
  if ((isOld === true) && (target.length === 1)) {
    const reinit = [...target];
    const old = reinit.splice(0);
    const copy = [[...old[0]], replacementArr[1]];

    copy[1] += old[0][1];

    reinit.push(copy);
    return reinit;
  }
  // FIXME: just do a one line Array.splice() instead
  // FIXME: also make it increment the old entry instead
  // FIXME: Clean up the below at some point
  if (isOld === true) {
    const reinit = [...target];
    const old = reinit.splice(i, 1);
    const copy = [[...old[0]], 1];
    copy[1] = old[0][1] + replacementArr[1];

    reinit.push(copy);
    return reinit;
  }
  // TODO: figure out what this is for
  const reinit = [...target];
  const copy = [[...replacementArr[0]], replacementArr[1]];
  copy[1] = 1;
  reinit.push(copy);
  return reinit;
}

function colorReduceUtil(arr, isNested = false, nestedLayers = 0) {
/* NOTE ONLY WORKS ON SINGLE LAYER ARRAYS OR AT MOST 2 LAYERS(i.e [1,2,3,4] or like the below:
  Target array is nested 2 layers deep
    [
      [
        [1,6], // TARGET ARRAY
        2
      ],
      [[3,2],4]
    ] */

  if (isNested === true) {
    const sum = arr.reduce((acc, item) => {
      if (item === null) {
        return acc;
      }
      // TODO: TEST ME
      acc += item[nestedLayers];
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

function checkIfSimUtil(valA, valB, range = 0.5) {
  const pctDiff = Math.abs((valA - valB) / valB);
  const isInRange = (pctDiff <= range) && (pctDiff >= 0);
  return isInRange;
}

/* FIXME: need to have a catch for both averages being equal
Also, the reduction converges at some point and stops reducing when it shouldn't be */
// TODO Figure out if recursive search is appropriate here
function rgbFreq(rgbArr) {
  const { length } = rgbArr;
  const rgbFreqArr = rgbArr.reduce((arr2, item, i) => {
    if (arr2.length === 0) {
      arr2.push([item, 1]);
    }
    if (i < length) {
      // if (i === 10) console.log(arr2);
      const currAvg = colorReduceUtil(item);
      const lastAvg = colorReduceUtil(arr2[arr2.length - 1][0]);
      const checkPct = checkIfSimUtil(currAvg, lastAvg);

      if (checkPct === true) {
        arr2[arr2.length - 1][1] += 1;
      } else {
        arr2.push([item, 1]);
      }
      return arr2;
    }
    if (i === length) {
      let h = 0;
      const fracLength = 0.05 * length;
      const breakpoint = 0.35 * length;
      while ((h > fracLength) || (h < 100000000)) {
        const arrLength = arr2.length;
        if (h < breakpoint) {
          for (let j = 0; j < arrLength; j += 1) {
            const current = arr2[j];
            const currentAvg = colorReduceUtil(current[0]);
            const toMerge = arr2.findIndex((ele, k) => {
              if (j === k) { return false; }
              const eleAvg = colorReduceUtil(ele[0]);

              const checkPct = checkIfSimUtil(eleAvg, currentAvg, 0.5);
              return checkPct;
            });
            arr2 = [...spliceUtil(current, arr2, true, toMerge)];
          }
        } else {
          for (let j = 0; j < arrLength; j += 1) {
            const current = arr2[j];
            const currentAvg = colorReduceUtil(current[0]);
            const toMerge = arr2.findIndex((ele, k) => {
              if (j === k) { return false; }
              const eleAvg = colorReduceUtil(ele[0]);

              const checkPct = checkIfSimUtil(eleAvg, currentAvg);
              return checkPct;
            });
            arr2 = [...spliceUtil(current, arr2, true, toMerge)];
          }
        }
        h += 1;
      }
    }
    return arr2;
  }, []);
  // console.log(rgbFreqArr);
  return rgbFreqArr;
}

function findMost(rgbSorted) {
  const rgb = [...rgbSorted];
  rgb.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });
  const mostFrequent = rgb.slice(0, 6);
  console.log(mostFrequent);
  const topSixColors = mostFrequent.map((val) => {
    const rgbVal = [...val[0]];
    return rgbVal;
  });
  console.log(topSixColors);
  return topSixColors;
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
