# AR:p5 Global Variables:

## `resX`: [integer]
- The number of characters horizontally on the text canvas. Calculated in [`charSetup()`](functions/charSetup.md).

## `resY`: [integer]
- The number of characters vertically on the text canvas. Calculated in [`charSetup()`](functions/charSetup.md).

## `font`: [p5.Font]
- The font that is used by AR:p5 to give it the classic ascii look. It is monospaced and included in the template file.

## `charWidth` [float]
- The width of a single character using `font` as its font. Calculated in [`charSetup()`](functions/charSetup.md).

## `charHeight` [float]
- The height of a single character using `font` as its font. Calculated in [`charSetup()`](functions/charSetup.md).

## `outBlock` [`resX` by `resY` array]
- The 2D array used to store the current frame that is being drawn on. It is modified by all of the [Shape functions](shape-functions.md) and at the end of every draw loop it is displayed.

## `notAllowedCharacters` [string]
- A string that contains every character that has been known to break things. If a character exists in this string, you should try not to use it for displaying things.

## `gradients` [array]
- The gradients array is a list of strings where every string is a gradient for use with the [drawing functions](drawing-functions.md) and the [shape functions](shape-functions.md). Any given entry in the gradients array represents the characters that a colour will be mapped to. Each gradient is arranged from left to right, and carefully avoid the use of any character from the `notAllowedCharacters` array. Feel free to add your own gradients to this array. The current gradient that is in use can be changed with [`gradientMode()`](functions/gradientMode.md).

## `currentGradient` [string]
- A string from the `gradients` array that is used to determine the colours in your sketch. By default initialized to the first entry in the `gradients` array.

## `currentStroke` [char]
- The character that is currently being used as the outline of shapes. Can be set using [`charStroke()`](functions/charStroke.md).

## `currentFill` [char]
- The character that is currently being used as the fill colour of shapes. Can be set using [`charFill()`](functions/charFill.md).

## `cubeVertices` [const array]
- a 
