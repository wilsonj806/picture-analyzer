import Uploader from './scripts/Upload';
import PixelData from './scripts/Data';
import {
  rgbFreq,
  findMost,
  findClipping,
} from './scripts/Data.analysis';
import Controller from './scripts/Controller';

require('@babel/polyfill');

const imgHandler = new PixelData();
const displayControl = new Controller(
  // '.display--dynamic',
  '.display',
  'display__entry',
);

// SECTION Callback Function

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

async function uploadHandler(event) {
  displayControl.clearCurrentDisplay();
  displayControl.resetList('.ul__metadata');
  const { canvas, ctx } = displayControl;
  const precheckVals = Uploader.fileCheck(event);
  if (precheckVals.status !== 'success') {
    const errStr = precheckVals.status;
    displayControl.fileWarn(errStr);
    return;
  }
  const selectedFile = precheckVals.file;
  const imgEle = await asyncUpload(selectedFile).then(val => val);
  Controller.renderMetadata(selectedFile, '.ul__metadata');
  // console.log(selectedFile);
  // console.dir(new Date(selectedFile.lastModified));
  displayControl.populateStrip(imgEle)
    .renderToCanvas(imgEle);
  // FIXME image quality is bad when rendered into the canvas on a 1024px screen
  imgHandler.setPixels(ctx, canvas.width, canvas.height)
    .parsePixels();
}

function btnColorHandler() {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  // TODO: stick the array into Local Storage at some point for later downloading
  displayControl.renderSwatch(arr);
}

function btnClipHandler() {
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
    const string = `% ${choice} clipping: ${val} %`;
    return string;
  });
  displayControl.renderClippingText(clipAsStrings);
  // displayControl.downloadArr('lightness', lightness);
}
// !SECTION

// SECTION Event Listeners

document.querySelector('.drop__target').addEventListener('dragenter', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
document.querySelector('.drop__target').addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
});

document.querySelector('.drop__target').addEventListener('drop', uploadHandler);

document.querySelector('[type="file"]').addEventListener('change', uploadHandler);

// For analysis

document.querySelector('.btn--color').addEventListener('click', btnColorHandler);

document.querySelector('.btn--clip').addEventListener('click', btnClipHandler);

/* document.querySelector('.btn--dl-arr').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  displayControl.downloadArr('color-1', arr);
}); */

// !SECTION
