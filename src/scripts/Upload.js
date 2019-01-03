import DomHelper from './DomHelper';

class Uploader {
  // TODO: Add dropeffect to the drag and drop
  constructor(canvas) {
    this.canvas = document.querySelector(canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  fileWarn(string = '') {
    const intro = DomHelper.setEle('.intro');
    const warnUpload = document.createElement('p');
    warnUpload.classList.add('js-danger-popup');
    switch (string) {
      case 'wrongType':
        warnUpload.innerText = 'Warning, you are trying to upload an unrecognized image file type. Accepted file types are (.png,.jpg,.bmp,.tiff,.svg, etc)';
        break;

      case 'wrongSize':
        warnUpload.innerText = 'Warning, image too big. Please limit file size to less than 1 Mb';
        break;

      case 'tooMany':
        warnUpload.innerText = 'Warning, you are trying to upload more than one file. The app does not process more than one image at a time.';
        break;

      case 'empty':
        intro.childNodes.forEach((node) => {
          if (node.nodeType !== 1) {
            return;
          }
          if (node.classList.contains('js-danger-popup') === true) {
            intro.removeChild(node);
          }
        });
        break;
      default:
        throw new Error(`
        Expecting one of the following string values(case-sensitive):
        "wrongType",
        "wrongSize",
        "tooMany",
        "empty"
      `);
    }

    if (!warnUpload.innerText) {
      return this;
    }
    intro.appendChild(warnUpload);
    return this;
  }

  handleFile(event, analysisSuite) {
    function checkFile(e) {
      if (e.type === 'drop') {
        e.stopPropagation();
        e.preventDefault();
        return e.dataTransfer.files;
      }
      if (e.type === 'change') {
        return e.target.files;
      }
      return null;
    }
    const uploadedFile = checkFile(event);
    const selectedFile = uploadedFile[0];
    this.fileWarn('empty');
    // check file type
    if (!selectedFile.type.startsWith('image')) {
      this.fileWarn('wrongType');
      return;
      // return null;
    }

    // check file size (1 Mb maximum)
    if (selectedFile.size > 1000000) {
      this.fileWarn('wrongSize');
      return;
      // return null;
    }

    // check number of files
    if (uploadedFile.length > 1) {
      this.fileWarn('tooMany');
      return;
      // return null;
    }

    // NOTE file uploads should be done asynchronously
    // fix that when decoupling all of this DOM manipulation

    const {
      canvas,
      ctx,
    } = this;
    const strip = DomHelper.setEle('.strip');
    const btnUpload = DomHelper.setEle('[type="file"]');

    const img = document.createElement('img');
    const li = document.createElement('li');
    btnUpload.value = '';
    img.src = window.URL.createObjectURL(selectedFile);

    img.classList.add('strip__img');
    li.classList.add('strip__item');
    li.dataset.index = strip.childElementCount + 1;
    li.dataset.name = selectedFile.name;

    // return new Promise((resolve, reject) => {
    //   console.log('hi I\'m working');
    //   img.onload = () => { resolve(img); };
    //   img.onerror = (e) => { reject(e); };
    // }).then((val) => {
    //   console.log('done');
    //   return val;
    // }); // return a promise???

    img.onload = () => {
      // console.dir(selectedFile);
      // console.dir(img);
      let pct;
      if (window.innerWidth <= 1280) {
        pct = 0.6;
      } else {
        pct = 0.9;
      }
      const wrapper = document.querySelector('.canvas-wrapper');
      const wrapperHeight = wrapper.clientHeight;
      const scaleFactor = (wrapperHeight / img.naturalHeight) * pct;
      const newWidth = img.naturalWidth * scaleFactor;
      const newHeight = img.naturalHeight * scaleFactor;

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      li.appendChild(img);
      strip.appendChild(li);
      window.URL.revokeObjectURL(img.src);
      // TODO: have catch for not having the module
      analysisSuite.setPixels(ctx, canvas.width, canvas.height).parsePixels();
    };
  }
}


export default Uploader;
