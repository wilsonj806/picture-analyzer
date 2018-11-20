// TODO: Implement a rate limiter for button presses

class Controller {
  constructor(displayTgt, color, clipping, entryClass) {
    this.target = document.querySelector(displayTgt);
    this.color = document.querySelector(color);
    this.clipping = document.querySelector(clipping);
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
    csv += 'val, count \n';
    arr.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });
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
      card.style.backgroundColor = `rgb(${val})`;
      card.classList.add('display__card');

      label.innerText = `rgb(${val})`;
      label.classList.add('display__label');

      entry.appendChild(card);
      entry.appendChild(label);
      this.target.appendChild(entry);
    });
    return this;
  }
}

export default Controller;
