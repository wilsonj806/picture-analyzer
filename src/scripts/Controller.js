// TODO: Implement a rate limiter for button presses

class Controller {
  constructor(displayTgt = '.display', entryClass = '.entry', canvas = '#canvas') {
    /* NOTE the entryClass input argument is chosen by the user
    and is for adding classes to the created cards */
    const isNotAllStrings = [...arguments].some((val) => {
      const valType = typeof val;
      return valType !== 'string';
    });
    const isCanvasEle = document.querySelector(canvas) instanceof HTMLCanvasElement;
    if (isNotAllStrings === true) {
      throw new Error('Expecting strings as input arguments for the contstructor');
    }
    if (isCanvasEle === false) {
      throw new Error('Expecting canvas to be an instance of HTMLCanvasElement in the DOM');
    }

    this.target = document.querySelector(displayTgt);
    this.entryClass = entryClass;
    this.canvas = document.querySelector(canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  populateStrip(imageEle, stripEle = '.strip') {
    const strip = document.querySelector(stripEle);
    const li = document.createElement('li');

    imageEle.classList.add('strip__img');
    li.classList.add('strip__item');
    li.dataset.index = strip.childElementCount + 1;
    li.appendChild(imageEle);
    strip.appendChild(li);
    return this;
  }

  /* TODO determine whether or not fileWarn() should return a DOM Element
  Also turn this into a modal at some point */

  fileWarn(string = '', targetEleSelector = '.intro') {
    const intro = document.querySelector(targetEleSelector);
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

  renderToCanvas(imageEle) {
    /* NOTE This method expects a wrapper element to encapsulate
    the <canvas> element for additional functionality */
    const {
      canvas,
      ctx,
    } = this;

    // Populate canvas
    let pct;
    if (window.innerWidth <= 1280) {
      pct = 0.6;
    } else {
      pct = 0.9;
    }
    const wrapper = canvas.parentNode;
    const wrapperHeight = wrapper.clientHeight;
    const scaleFactor = (wrapperHeight / imageEle.naturalHeight) * pct;
    const newWidth = imageEle.naturalWidth * scaleFactor;
    const newHeight = imageEle.naturalHeight * scaleFactor;

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(imageEle, 0, 0, newWidth, newHeight);
  }

  clearCurrentDisplay() {
    if (this.target.childElementCount > 0) {
      Array.from(this.target.children).forEach((node) => {
        this.target.removeChild(node);
      });
    }
  }

  renderSwatch(arr) {
    this.clearCurrentDisplay();
    const entriesAreRightLength = arr.every(val => val.length === 3);
    const entriesAreNumbers = arr.every((val) => {
      if (val.some(entry => (typeof entry === 'string'))) return false;
      const sum = val.reduce((acc, item) => acc + parseInt(item, 10), 0);
      const type = typeof sum;
      return ((type === 'number'));
    });
    if ((entriesAreRightLength === false) || (entriesAreNumbers === false)) {
      throw new Error('Expecting an array of format [[1,2,3]... [1,2,3]]');
    }
    let pxSize;
    if (window.innerWidth <= 1280) {
      pxSize = '25px';
    } else {
      pxSize = '50px';
    }
    arr.forEach((val, i) => {
      if (i > 6) return;
      const entry = document.createElement('div');
      const card = document.createElement('div');
      const label = document.createElement('p');
      entry.classList.add('display__entry');

      card.style.height = pxSize;
      card.style.width = pxSize;
      card.style.backgroundColor = `rgb(${val})`;
      card.classList.add('card', 'card--color');

      label.innerText = `rgb(${val})`;
      label.classList.add('display__label');

      entry.appendChild(card);
      entry.appendChild(label);
      this.target.appendChild(entry);
    });
    return this;
  }

  // TODO Determine if renderStrings() should also be allowed to render an input string
  renderStrings(arr) {
    this.clearCurrentDisplay();
    const hasStrings = arr.every((val) => {
      const valType = typeof val;
      const isString = (valType === 'string');
      return isString;
    });
    if (hasStrings === false) {
      throw new Error('Expecting input array to consist entirely of strings');
    }
    const card = document.createElement('div');
    card.classList.add('card', 'card--text');

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p1.classList.add('display__text');
    p2.classList.add('display__text');

    if ((p1.innerText !== '') || (p2.innerText !== '')) {
      document.getElementsByClassName('display__text').forEach((ele) => {
        ele.innerText = '';
      });
    }

    [p1.innerText, p2.innerText] = arr;

    card.appendChild(p1);
    card.appendChild(p2);
    this.target.appendChild(card);
  }

  // NOTE Helper functions for downloading test data

  downloadCSV(name, arr) {
    let csv = `${name}
    `;
    csv += 'val; count \n';
    arr.forEach((row) => {
      csv += row.join(';');
      csv += '\n';
    });
    const newEle = document.createElement('a');
    newEle.href = `data:text/csv;charset=utf-8, ${encodeURI(csv)}`;
    newEle.target = '_blank';
    newEle.download = `${name}.csv`;
    newEle.click();
    return this;
  }

  downloadArr(name, arr) {
    let csv = `[
    `;
    arr.forEach((row) => {
      csv += `["${row[0]}", ${row[1]}],`;
      csv += '\n';
    });
    csv += ']';
    const newEle = document.createElement('a');
    newEle.href = `data:text/csv;charset=utf-8, ${encodeURI(csv)}`;
    newEle.target = '_blank';
    newEle.download = `${name}.csv`;
    newEle.click();
    return this;
  }
}

export default Controller;
