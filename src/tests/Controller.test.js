import Controller from '../scripts/Controller';

fdescribe('A class object that deals with DOM manipulation', function() {

  beforeAll(function() {
    // NOTE Speedy DOM set up
    const body = document.body;
    const canvas = document.createElement('canvas');
    canvas.id = 'test-canvas';
    const display = document.createElement('div');
    display.classList.add('test-display');
    body.appendChild(canvas);
    body.appendChild(display);
  })

  afterAll(function() {
    // DOM element teardown
    const body = document.body;
    body.removeChild(document.getElementById('test-canvas'));
    body.removeChild(document.querySelector('.test-display'));
  })

  it('should return when called with inputs that aren\'t strings', function() {
    expect(function() { return new Controller(1,2,3); }).toThrow();
  })

  it('should return a DOM element when called with Controller.target', function() {
    const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
    const isHTMLELe = testController.target instanceof HTMLElement;
    expect(isHTMLELe).toBe(true);
  })
  it('should return a DOM element when called with Controller.canvas', function() {
    const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
    console.dir(testController.canvas);
    const isHTMLELe = testController.canvas instanceof HTMLCanvasElement;
    expect(isHTMLELe).toBe(true);
  })
  it('should return a context object when called with Controller.ctx', function() {
    const testController = new Controller('.test-display', 'test-entry', '#test-canvas');
    console.dir(testController.ctx);
    const isHTMLELe = testController.ctx instanceof CanvasRenderingContext2D;
    expect(isHTMLELe).toBe(true);
  })
  xit('should return a string when called with Controller.entryClass', function() {

  })

  xdescribe('A method that does stuff about array inputs', function() {
    it('should dump the contents of an input array when called with said input', function() {

    })
  })

  xdescribe('A method that does more array content dumping', function() {

    it('should dump the contents of an array into stuff when called', function() {

    })
  })

  xdescribe('A method that manipulates a canvas element', function() {
    it('should manipulate a canvas element when called with a image element input', function() {

    })
  })

  xdescribe('A method that makes cards', function() {

    it('should generate several palette cards when called with an input array', function() {

    })
  })
})


