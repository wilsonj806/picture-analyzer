# Testing Outline


## General Summary

Testing for this project was done with a combination of Jasmine, Karma, and Webpack for bundling. The configurations for Karma and Webpack can be found in the *./config* folder of the main directory. Some of the way I approach testing are based on a pair-programming session and the subsequent research(notes can be found in [pair-programming-notes.md](./pair-programming-notes.md)).

Tests are written in the style of Behavior Driven Development with suites following the "Given, when, then" format as much as possible.
- For example:
  - Given 'a method that manipulates a canvas element'
    - it 'should render an image into a rendering context when called with an image element input'

## Test Expectations

Most tests are written to expect very simple things and attempt not to be dependent on implementation details to run. The tests try not to be dependent on implementation details, but they are written to be very particular about what inputs and what outputs come out, along with making sure certain things are called.

- For example:
```js
describe('A method that manipulates a canvas element', function() {
    beforeAll(function() {
      // ... set up
    })
    it('should manipulate canvas properties when called', function() {
      // ... set up
      const spyCanv = spyOnProperty(canvas, 'parentNode').and.callThrough();
      testController.renderToCanvas(testImg);
      expect(spyCanv).toHaveBeenCalled();

    })
  })
```
The goal for this is to have solid expectation/ actual specifications for what every tested function/ method/ class should be doing, so if you take the input string for a test suite you'd get something like the below:

- Given a method for checking the uploaded file(s)
  1. it should try checking the type of input event when called with an event
  2. it should throw when called with an invalid File object
  3. it should check the file type when called
  4. it should return an array with a string and a file inside when called with an event with an image file

