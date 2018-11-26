import Uploader from './scripts/Upload';
import PixelData from './scripts/Data';
// TODO: move the below import into .scripts/Data and make getter/ setter functions
import {
  rgbFreq,
  findMost,
} from './scripts/Data.analysis';
import Controller from './scripts/Controller';

// TODO: make sure there's a handler for checking input types for constructors
// TODO: move DOM handling to Dom.helper.js

const uploader = new Uploader(
  '#canvas',
  '[type="file"]',
  '.drop__target',
);
const imgHandler = new PixelData();
const displayControl = new Controller(
  '.display',
  '.btn--color',
  '.btn--clip',
  'display__entry',
);

// Destructuring for convenience

const {
  dropzone,
  btnUpload,
} = uploader;

const {
  btnColor,
  btnClipping,
} = displayControl;

// For uploads

dropzone.addEventListener('dragenter', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
dropzone.addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
dropzone.addEventListener('drop', (e) => {
  uploader.handleDrop(e, imgHandler);
});

btnUpload.addEventListener('change', (e) => {
  uploader.handleBtnUpload(e, imgHandler);
});

// For analysis

btnColor.addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  displayControl.dumpContents(arr);
  //  .downloadCSV('rgb', imgHandler.rgbCount);
});

btnClipping.addEventListener('click', () => {
  imgHandler.rgb2Hsl();
  const clip = imgHandler.getLightness();
  displayControl.downloadCSV('clipping', clip);
});
