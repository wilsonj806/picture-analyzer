// TODO: Implement a rate limiter for button presses
// TODO: Remove certain DOM element selectors and replace with DomHelper

class Controller {
  constructor(displayTgt, entryClass) {
    this.target = document.querySelector(displayTgt);
    this.entryClass = entryClass;
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
    arr.forEach((val) => {
      const entry = document.createElement('div');
      const card = document.createElement('div');
      const label = document.createElement('p');
      entry.classList.add('display__entry');

      card.style.height = '50px';
      card.style.width = '50px';
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


    [p1.innerText, p2.innerText] = arr;

    card.appendChild(p1);
    card.appendChild(p2);
    this.target.appendChild(card);
    return this;
  }
}

export default Controller;
