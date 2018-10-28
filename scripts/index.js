// DOM element selection
const
  dropzone = document.querySelector('.drop__target'),
  strip = document.querySelector('.strip'),
  btnUpload = document.querySelector('[type="file"]'),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  uploadBar = document.getElementById('upload-bar')
;

// first need to handle upload
// then handle how to present the picture
// then handle data analysis

// drag https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications


function handleUpload(e){

}

function handleFile(e){
  // check file type
  // check number of files
  // check file size
  const selectedFile = e.target.files[0];
  console.dir(selectedFile);
  const img = document.createElement('img');
  const li = document.createElement('li');
  img.src = window.URL.createObjectURL(selectedFile);
  img.onload = function(){
    console.dir(img);
    const width = img.naturalWidth; // naturalHeight and width are analogous to videoHeight and width
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img,0,0, width, height);
    li.appendChild(img);
    strip.appendChild(li);
    window.URL.revokeObjectURL(this.src);
  }
  btnUpload.value = '';
  li.classList.add('strip__ctr');
  img.classList.add('strip__img');
  li.dataset.index = strip.childElementCount + 1;
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
dropzone.addEventListener('drop',e=>{
  e.stopPropagation();
  e.preventDefault();
  console.dir(e);
});
btnUpload.addEventListener('change',handleFile);

