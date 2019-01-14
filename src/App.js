import Uploader from './scripts/Upload';
import PixelData from './scripts/Data';
import {
  rgbFreq,
  findMost,
  findClipping,
} from './scripts/Data.analysis';
import Controller from './scripts/Controller';
import DomHelper from './scripts/DomHelper';

require('@babel/polyfill');

const imgHandler = new PixelData();
const displayControl = new Controller(
  '.display',
  'display__entry',
);

// For uploads

function asyncUpload(file) {
  return new Promise((resolve, reject) => {
    const imgEle = document.createElement('img');
    Uploader.parseImage(file, imgEle);
    imgEle.onload = () => {
      resolve(imgEle);
    };
    imgEle.onerror = (err) => { reject(err); };
  });
}

async function uploadHandler(e) {
  const canvas = DomHelper.setEle('#canvas');
  const ctx = canvas.getContext('2d');
  const precheckVals = Uploader.fileCheck(e);
  if (precheckVals[0] !== 'success') {
    const errStr = precheckVals[0];
    displayControl.fileWarn(errStr);
    return;
  }
  const selectedFile = precheckVals[1];
  const imgEle = await asyncUpload(selectedFile).then(val => val);
  displayControl.populateStrip(imgEle)
    .renderToCanvas(imgEle);
  /* FIXME: not super DRY since `ctx` and `canvas` is repeated in the below
  and in the above imgHandler method */
  // FIXME image quality is bad when rendered into the canvas on a 1024px screen
  imgHandler.setPixels(ctx, canvas.width, canvas.height)
    .parsePixels();
}

DomHelper.setEle('.drop__target').addEventListener('dragenter', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
DomHelper.setEle('.drop__target').addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
});

DomHelper.setEle('.drop__target').addEventListener('drop', uploadHandler);

DomHelper.setEle('[type="file"]').addEventListener('change', uploadHandler);

// For analysis

DomHelper.setEle('.btn--color').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  // TODO: stick the array into Local Storage at some point for later downloading
  displayControl.dumpContents(arr);
});

DomHelper.setEle('.btn--clip').addEventListener('click', () => {
  imgHandler.rgb2Hsl();
  const lightness = imgHandler.getLightness();
  const clip = findClipping(lightness);
  const clipAsStrings = clip.map((val, i) => {
    let choice;
    if (i === 0) {
      choice = 'black';
    } else {
      choice = 'white';
    }
    const string = `This is percent of ${choice} clipping: ${val} %`;
    return string;
  });
  displayControl.renderStrings(clipAsStrings);
  // displayControl.downloadArr('lightness', lightness);
});

DomHelper.setEle('.btn--dl-arr').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  displayControl.downloadArr('color-1', arr);
});
