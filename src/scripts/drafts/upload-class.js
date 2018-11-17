class Uploader {
  constructor() {
    this.intro = '.intro';
    this.canvas = 'canvas';
    this.strip = '.strip';
  }
}

Uploader.prototype.fileWarn = (string = '') => {
  const intro = document.querySelector(this.intro);
  const warnUpload = document.createElement('p');
  warnUpload.classList.add('js-danger-popup');
  switch (string) {
    case 'wrongType':
      warnUpload.innerText = 'Warning, you are trying to upload an unrecognized image file type. Accepted file types are (.png,.jpg,.bmp,.tiff,.svg, etc)';
      break;

    case 'wrongSize':
      warnUpload.innerText = 'Warning, image too big. Please limit file size to less than 2 Mb';
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
      break;
  }

  if (!warnUpload.innerText) {
    return;
  }
  intro.appendChild(warnUpload);
};
Uploader.prototype.handleFile = (files, analysisSuite) => {
  const selectedFile = files[0];
  this.fileWarn('empty');
  // check file type
  if (!selectedFile.type.startsWith('image')) {
    this.fileWarn('wrongType');
    return;
  }

  // check file size (2 Mb maximum)
  if (selectedFile.size > 2000000) {
    this.fileWarn('wrongSize');
    return;
  }

  // check number of files
  if (files.length > 1) {
    this.fileWarn('tooMany');
    return;
  }

  const img = document.createElement('img');
  const li = document.createElement('li');
  img.src = window.URL.createObjectURL(selectedFile);
  btnUpload.value = '';

  li.classList.add('strip__item');
  img.classList.add('strip__img');
  li.dataset.index = strip.childElementCount + 1;
  li.dataset.name = selectedFile.name;

  img.onload = () => {
    const wrapper = document.querySelector('.canvas-wrapper');
    const wrapperHeight = wrapper.clientHeight;
    const scaleFactor = (wrapperHeight / img.naturalHeight) * 0.9;
    const newWidth = img.naturalWidth * scaleFactor;
    const newHeight = img.naturalHeight * scaleFactor;

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    li.appendChild(img);
    strip.appendChild(li);
    window.URL.revokeObjectURL(img.src);
    analysisSuite.setPixels(ctx, canvas.width, canvas.height);
  };
};

Uploader.prototype.handleBtnUpload = (e, analysisSuite) => {
  const uploadedFile = e.target.files;
  this.handleFile(uploadedFile, analysisSuite);
};

Uploader.prototype.handleDrop = (e, analysisSuite) => {
  e.stopPropagation();
  e.preventDefault();
  const draggedFile = e.dataTransfer.files;
  this.handleFile(draggedFile, analysisSuite);
};
