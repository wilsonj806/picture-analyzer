# Picture Analyzer

## Status

[![Latest release](https://img.shields.io/github/tag/wilsonj806/picture-analyzer.svg)](https://github.com/wilsonj806/picture-analyzer)
![Current package.json version](https://img.shields.io/github/package-json/v/wilsonj806/picture-analyzer.svg?label=current%20version)
![Top language](https://img.shields.io/github/languages/top/wilsonj806/picture-analyzer.svg)


- [**Live Site**](https://wilsonj806.github.io/picture-analyzer/)

## Additional Documentation

- [Issues](ISSUES.md)
- [Development Process](doc/development-process.md)
- [Testing](doc/TESTING.md)
- [Things Learned](doc/things-learned.md)

## Description

This is a picture-analyzer that is meant to be a small app/ page to run in a web browser. It's supposed to take in user-uploaded pictures, parse it and send some very simplistic properties back. Functionally, the app is a very stripped down version of how Adobe Lightroom or even Adobe Photoshop presents image information.

## Goals

My goal for this project was to develop something that required some complex JavaScript and testing, the latter of which I've never handled. In addition, I wanted to use this project to practice using Git, npm, and Webpack since these technologies were fairly predominant in web development nowadays.

As this is meant to push and challenge my JavaScript skills, **a bare minimum amount of UI elements were added** in order to get to programming faster and was intended to be refactored heavily at the end.

### Roadmap to v1.0.0

**Currently implemented features**
- File upload system
- Image analysis
  - an algorithm for finding the most frequent color
    - its not super optimal, as it converges extremely quickly
  - a simplistic algorithm for finding highlight and shadow clipping
- Data display system
  - displays most frequent colors
  - displays clipping as a percentage
- Bare minimum UI

**Version 0.75.0 should have the following done**
- File uploading system via drag and drop or with a button
- Uploaded images should be displayed via the image strip
- The user should have options for selecting what image stat to display
  - stats should be presented in a table or something similar
- Proper colors for the UI

**Version 1.0.0 should have the following done**
- Tests for relevant units/ whatever service and end to end tests needed
- Any necessary refactoring
- Make the page fully responsive
- Modals for prompts/ warning messages/ etc

### Post v1.0.0 support

The below features are more intended to be extra features to be implemented **after v1.0.0**
- Port this to React
- Use D3.js for data visualization
  - Hard mode: figure out how to use pure JS to make charts for Lightness in an image before using D3.js
- Use web components/ templates/ shadow DOM for displaying data
- Uploaded images should be accessible via a image strip
  - if the uploaded images cannot be displayed all at once in the strip, provide a carousel to scroll through
- Model dynamic range of an image with a polynomial instead of using array methods
- Implement the data-analysis in Node instead
- Make a RGB to HSL conversion function so that `@csstools/convert-colors` can be removed from dependencies

## Tooling/ Primary Libraries Used

SCM:
- [Git](https://www.git-scm.com/about)

Runtime Dependencies:
- [Convert Colors](https://www.npmjs.com/package/@csstools/convert-colors)

Tooling:

- [Babel](https://babeljs.io/)
- [ES Lint](https://eslint.org/)
- [Jasmine](https://jasmine.github.io/)
- [Karma](http://karma-runner.github.io/latest/index.html)
- [Webpack](https://webpack.js.org/)

## Cloning instructions

You'll need to have some version of Node.js(and subsequently npm, which is included) installed.

Clone the repo with your favorite SCM or manually download it
```
git clone https://github.com/wilsonj806/picture-analyzer.git
```

Change your working directory to the folder of the newly cloned repo and run ```npm install``` in your command line interface.

## License

Code released under the [ISC license](https://opensource.org/licenses/ISC)
