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

  /* TODO Check to see if the ['string', File obj or null] is necessary or reformat it
  At the very least change the output to be an object instead */

  static fileCheck(event) {
    const uploadedFile = this.handleFile(event);
    // TODO add if (selectedFile instanceof File) { throw ... }
    // console.dir(uploadedFile);
    if (uploadedFile === null) {
      return ['wrongType', null];
    }
    const selectedFile = uploadedFile[0];
    const { type, size } = selectedFile;
    const isImg = type.startsWith('image');
    // console.dir(selectedFile);

    if (isImg === false) {
      return ['wrongType', null];
    }

    // check file size (1 Mb maximum)
    if (size > 1000000) {
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

    const btnUpload = document.querySelector('[type="file"]');
    btnUpload.value = '';
    img.dataset.name = file.name;
    img.src = window.URL.createObjectURL(file);
  }
}

export default Uploader;
