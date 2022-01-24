# `charSetup()`

## Description
`charSetup()` needs to be called in `setup()`. It does a number of things to prepare the sketch. Namely,
- Determines `charWidth` and `charHeight`
- Determines `resX`/`resY`
- Instantiates `outBlock`
- Sets the appropriate css properties of the text on the screen
- Disables right clicking 

It optionally takes in one argument, `res`, which controls how big the text is. It is expressed just how fonts normally are, aka in 'points'.

## Syntax
`charSetup(res)`
> `res`: optional - the font size of the text on the screen. Default value is 16.

## Returns
Nothing