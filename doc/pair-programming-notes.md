# Initial notes

## General Description

These are notes made during a pair programming meeting/ webcall with a friend. They're not intended to be super professional


## Hotes

how you start

Units test
test coverage

- unit test
  - break it down to smallest bits
- functional/ integration test
- end to end test (UI UX styff)
- https://martinfowler.com/articles/practical-test-pyramid.html

 ^ pretty good
- lots of unit tests
- service tests about equal to functional/ integration
- analysis dependent on the HTML context, which no bueno
  - decouple upload from data

Split down methods or move methods to Controller
  - controller depends on uploader instead for dumping data as DOM elements

controller.test.js
  - tests it as one stand alone thing
  - more unit tests within that for each method

test domhelper.js

uploader.test.js
  - this test is going to suck because it depends on a DOM element having been loaded, and
  - but also test how it integrates domhelper
  - pass in a mock object with stubbed methods
  - check that img.onload is actually passing a function

test data.analysis.js first

given when, then pattern
  - given this stuff
    - gonna make some mocks as specified
  - invoke object under test, and then pass in the required mocks into the test target
  - when calling this object under test(blah blah do this, or do that)
  - then this stuff should be true or expecting this kind of output

best practices wise
- isolate places where you interact with the DOM(canvas, etc)
  - check canvas if it HAS to be implemented so that the JS interact with UI element

As a general rule return a value instead of just dumping a bunch of methods together, see below:
```js
document.querySelector('.drop__target').addEventListener('drop', (e) => {
  // let arr = uploader.handlePixeldata()
  uploader.handleDrop(e, imgHandler);
  // controller.updateStrip(arr);
});
```