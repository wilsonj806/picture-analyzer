import Uploader from './scripts/Upload';
import AnalyzeImg from './scripts/Analyze';
import Controller from './scripts/Controller';

// TODO: make sure there's a handler for checking input types for constructors

const uploader = new Uploader(
  '.intro',
  '#canvas',
  '.strip',
  '[type="file"]',
  '.drop__target',
);
const imgHandler = new AnalyzeImg();
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
  color,
  clipping,
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

color.addEventListener('click', () => {
  imgHandler.rgbFreq();
  const arr = imgHandler.findMost();
  displayControl.dumpContents(arr);
  //  .downloadCSV('rgb', imgHandler.rgbCount);
});

clipping.addEventListener('click', () => {
  imgHandler.rgb2Hsl();
  const clip = imgHandler.getLightness();
  displayControl.downloadCSV('clipping', clip);
});
