# Getting started with AR:p5

## What is it?
Ascii Renderer for p5 (AR:p5) is a library for use with p5 that uses familiar p5 syntax and workflow to draw things with ascii text. It can be used to make games, simulations, etc.

## How do you set it up?
You just need to download the template.zip file and extract it. Once extracted, open it with your editor of choice and start writing code in sketch.js.

The template contains a number of things:
- assets folder
    - consolas font file (for the classic retro look)
- css folder
    - css file that sets everything up to look the way it does and disables certain formatting, etc
- js folder
    - all the normal p5.js files including p5.sound
    - functions.js, which is where all of the AR:p5 code is stored
- .eslintrc.js, which is just an options file for eslint. Not necessary for things to work, just a preference.
- index.html, which puts the canvas on the screen and links to the sketch
- sketch.js, where you will write your code.

## How does it work?

When the sketch is started, you must call [`charSetup()`](functions/charSetup.md). This creates a P1 element in the body with id `textCanvas`. That is where all the text will be written to while the sketch is running. It is updated every frame. In [`charSetup()`](functions/charSetup.md), the width and height of a character is determined. This allows all the drawing functions to operate on a grid that is `charWidth` by `charHeight`. To determine colours, the [`gradientMapper()`](functions/gradientMapper.md) will take in the stroke or fill as a number and convert it to a character using `currentGradient`. The gradients are created by hand, and by default it is set to the one I came up with.