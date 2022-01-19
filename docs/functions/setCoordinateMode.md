# `setCoordinateMode()`

## Description
`setCoordinateMode()` will change the current `coordinateMode` of the sketch. `coordinateMode` changes how any function that takes in coordinates will behave. More details will be in Example below.

## Syntax
`setCoordinateMode(mode)`
> `mode`: either `SCREEN` or `CHAR`.

## Returns
Nothing

## Example
`coordinateMode` of `SCREEN` means that all the coordinates given to functions will be in pixels, just like p5. For most intensive purposes, thats fine. However, if you want something in an **exact** location relative to the characters around it, you have to use character coordinates (`setCoordinateMode(CHAR)`). Character coordinates will literally count the nubmer of characters (starting at 0). This will remove rounding error and will be more useful in some situations (or so I've found).

For the '`*`' point, I will use pixel coordinates. For the '`+`', char coordinates. Note that the pixel example would look different for everyone because people have different resolutions, so this is just rough.

```
// Example

setCoordinateMode(SCREEN)
charPoint(10, 5, '*')

setCoordinateMode(CHAR)
charPoint(10, 5, '+')



output (imagine this is a little screen):
.*............................ <- pixel coordinates
..............................
..............................
..............................
..............................
..........+................... <- char coordinates
..............................
```