import DomHelper from './DomHelper';

class Uploader {
  // TODO: Add dropeffect to the drag and drop

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

  handleFile(event, imageEle) {
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
    const img = imageEle;
    this.fileWarn('empty');
    // check file type
    // FIXME: move this to Controller.js
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

    const btnUpload = DomHelper.setEle('[type="file"]');
    btnUpload.value = '';
    img.dataset.name = selectedFile.name;
    img.src = window.URL.createObjectURL(selectedFile);
  }
}


export default Uploader;
