// TODO: Implement a rate limiter for button presses

import DomHelper from './DomHelper';

class Controller {
  constructor(displayTgt, entryClass, canvas) {
    this.target = document.querySelector(displayTgt);
    this.entryClass = entryClass;
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

  populateComponents(imageEle) {
    const {
      canvas,
      ctx,
    } = this;

    // Populate strip
    const strip = DomHelper.setEle('.strip');
    const li = document.createElement('li');

    imageEle.classList.add('strip__img');
    li.classList.add('strip__item');
    li.dataset.index = strip.childElementCount + 1;
    li.appendChild(imageEle);
    strip.appendChild(li);

    // Populate canvas
    let pct;
    if (window.innerWidth <= 1280) {
      pct = 0.6;
    } else {
      pct = 0.9;
    }
    const wrapper = document.querySelector('.canvas-wrapper');
    const wrapperHeight = wrapper.clientHeight;
    const scaleFactor = (wrapperHeight / imageEle.naturalHeight) * pct;
    const newWidth = imageEle.naturalWidth * scaleFactor;
    const newHeight = imageEle.naturalHeight * scaleFactor;

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(imageEle, 0, 0, newWidth, newHeight);
  }

  dumpContents(arr) {
    if (this.target.childElementCount > 0) {
      Array.from(this.target.children).forEach((node) => {
        this.target.removeChild(node);
      });
    }
    this.makeTable(arr);
    return this;
  }

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

  makeTable(arr) {
    // TODO: Make the CSS line up
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
      card.style.backgroundColor = `rgb(${val[0]})`;
      card.classList.add('card', 'card--color');

      label.innerText = `rgb(${val[0]})`;
      label.classList.add('display__label');

      entry.appendChild(card);
      entry.appendChild(label);
      this.target.appendChild(entry);
    });
    return this;
  }

  presentStrings(arr) {
    if (this.target.childElementCount > 0) {
      Array.from(this.target.children).forEach((node) => {
        this.target.removeChild(node);
      });
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
    return this;
  }
}

export default Controller;
