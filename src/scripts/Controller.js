// dump data into custom DOM elements here

// TODO: Implement a rate limiter for button presses

class Controller {
  constructor(displayTgt, btn1, btn2) {
    this.target = document.querySelector(displayTgt);
    this.color = document.querySelector(btn1);
    this.clipping = document.querySelector(btn2);
    this.entryClass = '.display__entry';
  }

  dumpContents(arr) {
    console.log(arr);
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
      const label = document.createElement('h5');
      entry.classList.add('display__entry');

      card.style.height = '40px';
      card.style.width = '40px';
      card.style.backgroundColor = `rgb(${val})`;

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
