# Picture Analyzer

## Status

[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/wilsonj806/picture-analyzer.svg)](https://github.com/wilsonj806/picture-analyzer)
[![devDependencies Status](https://david-dm.org/wilsonj806/picture-analyzer/dev-status.svg)](https://david-dm.org/wilsonj806/picture-analyzer?type=dev)

## Description

This is a picture-analyzer that is meant to be a small app/ page to run in a web browser. It's supposed to take in user-uploaded pictures, parse it and send some very simplistic properties back. Functionally, the app is a very stripped down version of how Adobe Lightroom or even Adobe Photoshop presents image information.

### Goals

My goal for this project was to develop something that required some complex JavaScript and testing, the latter of which I've never handled. In addition, I wanted to use this project to practice using Git, npm, and Webpack since these technologies were fairly predominant in web development nowadays.

### Requirements

**Version 1.0.0 should have the following features**
- File uploading system via drag and drop or with a button
- Uploaded images should be accessible via a image strip
  - if the uploaded images cannot be displayed all at once in the strip, provide a carousel to scroll through
- The user should have options for selecting what image stat to display
  - stats should be presented in a table or something similar

**Currently implemented features**
- File upload system
- Image analysis *partial implementation*

### Bonus features

The below features are more intended to be extra features to be implemented after v1.0.0
- Use D3.js for data visualization
  - Hard mode: figure out how to use pure JS to make charts for Lightness in an image
- Make the page fully responsive

## Dependencies

SCM:
- [Git](https://www.git-scm.com/about)

Runtime Dependencies:
- [Convert Colors](https://www.npmjs.com/package/@csstools/convert-colors)

Development Dependencies:
- [Webpack](https://webpack.js.org/)
- [ES Lint](https://eslint.org/)
- [Jasmine](https://jasmine.github.io/)

## License

Code released under the [ISC license](https://opensource.org/licenses/ISC)
