# Picture Analyzer

## Status

[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/wilsonj806/picture-analyzer.svg)](https://github.com/wilsonj806/picture-analyzer)
[![devDependencies Status](https://david-dm.org/wilsonj806/picture-analyzer/dev-status.svg)](https://david-dm.org/wilsonj806/picture-analyzer?type=dev)

- [**Live Site**](https://wilsonj806.github.io/picture-analyzer/)

## Description

This is a picture-analyzer that is meant to be a small app/ page to run in a web browser. It's supposed to take in user-uploaded pictures, parse it and send some very simplistic properties back. Functionally, the app is a very stripped down version of how Adobe Lightroom or even Adobe Photoshop presents image information.

## Goals

My goal for this project was to develop something that required some complex JavaScript and testing, the latter of which I've never handled. In addition, I wanted to use this project to practice using Git, npm, and Webpack since these technologies were fairly predominant in web development nowadays.

### Roadmap to v1.0.0

**Currently implemented features**
- File upload system
- Image analysis *partial implementation*
- Multi-image display

**Version 0.75.0 should have the following done**
- File uploading system via drag and drop or with a button
- Uploaded images should be displayed via the image strip
- The user should have options for selecting what image stat to display
  - stats should be presented in a table or something similar
- Proper colors for the UI

**Version 1.0.0 should have the following done**
- Tests for every component
- Any necessary refactoring

### Post v1.0.0 support

The below features are more intended to be extra features to be implemented **after v1.0.0**
- Port this to React
- Use D3.js for data visualization
  - Hard mode: figure out how to use pure JS to make charts for Lightness in an image
- Make the page fully responsive
- Use web components/ templates/ shadow DOM for displaying data
- Uploaded images should be accessible via a image strip
  - if the uploaded images cannot be displayed all at once in the strip, provide a carousel to scroll through

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
