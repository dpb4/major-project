# Getting started with AR:p5

## What is it?

## How do you set it up?

## How does it work?

When the sketch is started, you must call [`charSetup()`](functions/charSetup.md). This creates a P element in the body with id `textCanvas`. That is where all the text will be written do while the sketch is running. It is updated every frame. In [`charSetup()`](functions/charSetup.md), the width and height of a character is determined. This allows all the drawing functions to operate on a grid that is `charWidth` by `charHeight`. To determine colours, the [`gradientMapper()`](functions/gradientMapper.md) will take in the stroke or fill as a number and convert it to a character using `currentGradient`. The gradients are created by hand, and by default it is set to the one I came up with.