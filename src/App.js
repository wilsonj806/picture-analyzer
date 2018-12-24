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

// FIXME: make sure values are reset if you click the button again

DomHelper.setEle('.btn--color').addEventListener('click', () => {
  imgHandler.rgbCount = rgbFreq(imgHandler.rgbArr);
  // console.log(imgHandler.rgbCount);
  const arr = findMost(imgHandler.rgbCount);
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
