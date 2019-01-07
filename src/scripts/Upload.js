import DomHelper from './DomHelper';

class Uploader {
  static handleFile(event) {
    if (event.type === 'drop') {
      event.stopPropagation();
      event.preventDefault();
      return event.dataTransfer.files;
    }
    if (event.type === 'change') {
      return event.target.files;
    }
    return null;
  }

  static fileCheck(event) {
    const uploadedFile = this.handleFile(event);
    const selectedFile = uploadedFile[0];
    if (!selectedFile.type.startsWith('image')) {
      return ['wrongType', null];
    }

    // check file size (1 Mb maximum)
    if (selectedFile.size > 1000000) {
      return ['wrongSize', null];
    }

    // check number of files
    if (uploadedFile.length > 1) {
      return ['wrongQty', null];
    }
    return ['success', selectedFile];
  }

  static parseImage(file, imageEle) {
    const img = imageEle;

    const btnUpload = DomHelper.setEle('[type="file"]');
    btnUpload.value = '';
    img.dataset.name = file.name;
    img.src = window.URL.createObjectURL(file);
  }
}

export default Uploader;
