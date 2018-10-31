//const convert = require('color-convert');

// DOM element selection
const
  dropzone = document.querySelector('.drop__target'),
  strip = document.querySelector('.strip'),
  btnUpload = document.querySelector('[type="file"]'),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d')
;

// then handle how to present the picture
  // get size of the user's screen
  // get aspect ratio of the picture
// then handle data analysis

// drag https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

function handleBtnUpload(e){
  const uploadedFile = e.target.files;
  handleFile(uploadedFile);
}

function handleDrop(e){
  e.stopPropagation();
  e.preventDefault();
  const draggedFile = e.dataTransfer.files; // only works in mozilla
  handleFile(draggedFile);
}

function handleFile(files){
  const selectedFile = files[0];
  fileWarn('empty');
  // check file type
  if (!selectedFile.type.startsWith('image')){
    fileWarn('wrongType');
    return;
  }

  // check file size (10 Mb maximum)
  if (selectedFile.size > 10000000){
    fileWarn('wrongSize');
    return;
  }

  // check number of files
  if (files.length > 1){
    fileWarn('tooMany');
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
  img.onload = function(){
    const width = img.naturalWidth * .5; // naturalHeight and width are analogous to videoHeight and width
    const height = img.naturalHeight * .5;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img,0,0, width, height);
    li.appendChild(img);
    strip.appendChild(li);
    window.URL.revokeObjectURL(this.src);
  }
}

function fileWarn(string = ''){
  const intro = document.querySelector('.intro');
  const warnUpload = document.createElement('p');
  warnUpload.classList.add('js-popup');
  switch(string){
    case 'wrongType':
      warnUpload.innerText = 'Warning\, you are trying to upload an unrecognized image file type. Accepted file types are (.png,.jpg,.bmp,.tiff,.svg, etc)';
      break;
    case 'wrongSize':
      warnUpload.innerText = 'Warning\, image too big. Please limit file size to less than 10 Mb';
      break;
    case 'tooMany':
      warnUpload.innerText = 'Warning\, you are trying to upload more than one file. The app does not process more than one image at a time.';
      break;
    case 'empty':
      intro.childNodes.forEach(node=>{
        if(node.nodeType !== 1){
          return;
        }
        if (node.classList.contains('js-popup') === true){
          intro.removeChild(node);
          return;
        }
      });
      break;
    default:
      console.warn('function expects "wrongType", "wrongSize", or "tooMany" as inputs');
  }

  if (!warnUpload.innerText){
    return;
  }
  intro.appendChild(warnUpload);

}

// event listeners

dropzone.addEventListener('dragenter', e=>{
  e.stopPropagation();
  e.preventDefault();
});
dropzone.addEventListener('dragover', e=>{
  e.stopPropagation();
  e.preventDefault();
});
dropzone.addEventListener('drop', handleDrop);

btnUpload.addEventListener('change',handleBtnUpload);
