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

// TODO: make sure there's a handler for checking input types for constructors

const uploader = new Uploader(
  '#canvas',
);
const imgHandler = new PixelData();
const displayControl = new Controller(
  '.display',
  'display__entry',
);

// For uploads

DomHelper.setEle('.drop__target').addEventListener('dragenter', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
DomHelper.setEle('.drop__target').addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
});
DomHelper.setEle('.drop__target').addEventListener('drop', (e) => {
  uploader.handleDrop(e, imgHandler);
});

DomHelper.setEle('[type="file"]').addEventListener('change', (e) => {
  uploader.handleBtnUpload(e, imgHandler);
});

// For analysis

DomHelper.setEle('.btn--color').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  const arr = findMost(imgHandler.rgbCount);
  displayControl.dumpContents(arr);
});

DomHelper.setEle('.btn--clip').addEventListener('click', () => {
  imgHandler.rgb2Hsl();
  const clip = imgHandler.getLightness();
  const strings = findClipping(clip, imgHandler.pixelCount);
  displayControl.presentStrings(strings);
});
