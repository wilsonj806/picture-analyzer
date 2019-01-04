import Uploader from './scripts/Upload';
import PixelData from './scripts/Data';
// TODO: move the below import into .scripts/Data and make getter/ setter functions
import {
  rgbFreq,
  findMost,
  findClipping,
} from './scripts/Data.analysis';
import Controller from './scripts/Controller';
import DomHelper from './scripts/DomHelper';

require('@babel/polyfill');

// TODO: make sure there's a handler for checking input types for constructors

const uploader = new Uploader();
const imgHandler = new PixelData();
const displayControl = new Controller(
  '.display',
  'display__entry',
  '#canvas',
);

// For uploads

function asyncUpload(e) {
  return new Promise((resolve, reject) => {
    const imgEle = document.createElement('img');
    // TODO: make uploader return a string to pass into controller if it fails???
    uploader.handleFile(e, imgEle);
    imgEle.onload = () => {
      resolve(imgEle);
    };
    imgEle.onerror = (err) => { reject(err); };
  });
}

async function uploadHandler(e) {
  const canvas = DomHelper.setEle('#canvas');
  const ctx = canvas.getContext('2d');
  const imgEle = await asyncUpload(e).then(val => val);
  // console.dir(imgEle);
  displayControl.populateComponents(imgEle);
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

// FIXME: make sure values are reset if you click the button again

DomHelper.setEle('.btn--color').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  // console.log(imgHandler.rgbCount);
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
  displayControl.presentStrings(clipAsStrings);
  // displayControl.downloadArr('lightness', lightness);
});

DomHelper.setEle('.btn--dl-arr').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  // console.log(imgHandler.rgbCount);
  const arr = findMost(imgHandler.rgbCount);
  displayControl.downloadArr('color-1', arr);
});
