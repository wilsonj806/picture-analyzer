# Issues

## General Note

This isn't fully set up with Github Issues just yet, so for now its just a list of issues and pointers to where to look for solutions.

## Known Issues

- Some functionality isn't performing as expected on MacOS
  - probably a color profile issue
    - need to check the [Canvas/ Rendering Context docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - also should look into the ImageBitmap API/ `self.createImageBitmap()
    - [Applicable Can I Use for the above](https://caniuse.com/#search=createImageBitmap)
- The script for finding the most frequent color isn't fully functional/ working correctly
  - last commit this was worked on was Commit a81f975 in Pull Request #8