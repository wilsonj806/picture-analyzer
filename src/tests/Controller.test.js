import Controller from '../scripts/Controller';

describe('A class object that deals with DOM manipulation', function() {

  beforeAll(function() {
    // Speedy DOM set up
    const body = document.body;
    const main = document.createElement('main');
    main.classList.add('main');

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const canvas = document.createElement('canvas');
    canvas.id = 'test-canvas';

    const display = document.createElement('div');
    display.classList.add('test-display');

    const fakeCanvas = document.createElement('div');
    fakeCanvas.classList.add('canvas');

    const strip = document.createElement('ul');
    strip.classList.add('strip');

    body.appendChild(main);
    wrapper.appendChild(canvas);
    main.appendChild(wrapper);
    main.appendChild(display);
    main.appendChild(strip);
  })

  afterAll(function() {
    // DOM element teardown
    const body = document.body;
    body.removeChild(document.querySelector('main'));
  })

  it('should throw when instanced with inputs that aren\'t strings', function() {
    expect(function() { return new Controller(1,2,3); }).toThrow();
  })
  it('should throw when instanced with an invalid Canvas Element selector', function() {
    expect(function() { return new Controller('.test-display', 'entry', '.canvas'); }).toThrow();
  })

  it('should return a DOM element when it tries calling Controller.target', function() {
    const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
    const isHTMLELe = testController.target instanceof HTMLElement;
    expect(isHTMLELe).toBe(true);
  })

  xdescribe('A method that dumps an image element into a list', function() {
    it('should update stuff', function() {

    })
  })

  describe('A method that manipulates a canvas element', function() {
    beforeAll(function() {
      const testImg = document.createElement('img');
      testImg.classList.add('test-img');
      testImg.src = 'https://i.imgur.com/XiyeGgN.jpg';
      document.querySelector('main').appendChild(testImg);
    })

    it('should render an image into a rendering context when called with an image element input', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const testImg = document.querySelector('.test-img');
      const ctx = testController.canvas.getContext('2d');

      // NOTE This is a working spy, it doesn't return anything though
      const spyCtx = spyOn(ctx, 'drawImage');
      expect(() => {testController.renderToCanvas(testImg)}).not.toThrow();
      // expect(spy).toHaveBeenCalledWith(testImg);
      expect(spyCtx).toHaveBeenCalled();
    })
    it('should manipulate canvas properties when called', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      // const initWidth = document.getElementById('test-canvas').width;
      const canvas = document.querySelector('#test-canvas');
      const testImg = document.querySelector('.test-img');
      const spyCanv = spyOnProperty(canvas, 'parentNode').and.callThrough();

      testController.renderToCanvas(testImg);
      // const isNotEqualToInit = (testController.canvas.width !== initWidth);
      expect(spyCanv).toHaveBeenCalled();
      // expect(isNotEqualToInit).toBe(true);
    })
  })

  describe('A method that makes swatches', function() {

    afterEach(function() {
      const target = document.querySelector('.test-display');
      if (target.childElementCount > 0) {
        Array.from(target.children).forEach((node) => {
          target.removeChild(node);
        });
      }
    })

    it('should throw when called with an input array that isn\'t in the right format', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const wrongInput = {1:3, appleSauce: false};
      const wrongArr = ['potato', 'peanut', 'pineapple', 'pear', 'papaya', 'parsnip'];
      const wrongArr2 = [['a','b','c'], ['a','b','c'], ['a','b','c']];
      const rightArr = [[1, 2, 3], [1, 2, 4], [3, 2, 1]];

      expect(() => { testController.renderSwatch(wrongInput); }).toThrow();
      expect(() => { testController.renderSwatch(wrongArr); }).toThrow();
      expect(() => { testController.renderSwatch(wrongArr2); }).toThrow();
      expect(() => { testController.renderSwatch(rightArr); }).not.toThrow();
    })

    it('should generate the same amount of swatch cards as the input array calls for when called with an array of rgb values', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arr = [[1, 2, 3], [1, 2, 4], [3, 2, 1]];
      testController.renderSwatch(arr);
      const target = document.querySelectorAll('.card--color');

      console.dir(target);
      expect(target.length).toBe(arr.length);
    })

    it('should set the background color of each generated card when called with an array of rgb values', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arr = [[1, 2, 3], [1, 2, 4], [3, 2, 1]];
      testController.renderSwatch(arr);
      const target = document.querySelectorAll('.card--color');
      // console.dir(target);
      const style = Array.from(target).map((card) => {
        return card.attributes[1].nodeValue;
      });
      console.log(style);
      const hasColorChanged = Array.from(target).every((card) => {
        const regex = /(background\-color\: rgb)/i;
        const cardStyle = card.attributes[1];
        const hasBckgndClrAtt = regex.test(cardStyle.value);
        return hasBckgndClrAtt;
      })

      expect(hasColorChanged).toBe(true);
    })

    it('should add labels to each generated card when called with an array of rgb values', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arr = [[1, 2, 3], [1, 2, 4], [3, 2, 1]];
      testController.renderSwatch(arr);
      const target = document.querySelectorAll('.display__label');
      const hasLabel = Array.from(target).every((card) => {
        return (card.tagName === 'P');
      });
      const hasInnerText = Array.from(target).every((card) => {
        return (card.innerText !== '');
      });

      expect(hasLabel).toBe(true);
      expect(hasInnerText).toBe(true);
    })
  })

  describe('A method that creates DOM elements from an array of 2 strings', function() {

    it('should throw if the array consists of elements that aren\'t strings when called', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arrWrong = [1,'2'];
      expect(() => { testController.renderClippingText(arrWrong)}).toThrow();
    })

    it('should create two paragraph elements when called', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arrStr = ['hi', 'hello'];
      testController.renderClippingText(arrStr);
      const generatedChild = document.querySelector('.card--text');
      const isPrghEle = Array.from(generatedChild.children).every(ele => ele.tagName === 'P');

      expect(generatedChild.childElementCount).toBe(2);
      expect(isPrghEle).toBe(true);
    })

    it('should fill the created paragraph elements with the contents of the input array when called', function() {
      const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
      const arrStr = ['hi', 'hello'];
      testController.renderClippingText(arrStr);
      const generatedPrghEle = document.querySelectorAll('.display__text');

      const matchesInputArr = Array.from(generatedPrghEle).map((ele, i) => {
        return ele.innerText === arrStr[i];
      });
      const isAllTrue = matchesInputArr.every(val => { return val=== true });

      expect(isAllTrue).toBe(true);
    })
  })

})


