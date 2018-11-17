import Uploader from './scripts/Upload';
import ImageData from './scripts/Analyze';

// TODO: port this to image handler at some point
const colorStats = document.querySelector('.btn--color-stats');
const clipping = document.querySelector('.btn--clipping');

const uploader = new Uploader('.intro', '#canvas', '.strip', '[type="file"]', '.drop__target');
const imgHandler = new ImageData();


const {
  dropzone,
  btnUpload,
} = uploader;

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

colorStats.addEventListener('click', () => {
  imgHandler.parsePixels();
  imgHandler.sortRGB();
  imgHandler.findMost();
});

clipping.addEventListener('click', () => {
  imgHandler.rgb2Hsl();
  imgHandler.getLightness();
});
