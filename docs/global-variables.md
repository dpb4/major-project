# AR:p5 Global Variables:

## `resX`: [integer]
- The number of characters horizontally on the text canvas. Calculated in [`charSetup()`](functions/charSetup).

## `resY`: [integer]
- The number of characters vertically on the text canvas. Calculated in [`charSetup()`](functions/charSetup).

## `font`: [p5.Font]
- The font that is used by AR:p5 to give it the classic ascii look. It is monospaced and included in the template file.

## `charWidth` [float]
- The width of a single character in pixels using `font` as its font. Calculated in [`charSetup()`](functions/charSetup).

## `charHeight` [float]
- The height of a single character in pixels using `font` as its font. Calculated in [`charSetup()`](functions/charSetup).

## `outBlock` [`resX` by `resY` array]
- The 2D array used to store the current frame that is being drawn on. It is modified by all of the [shape functions](shape-functions) and at the end of every draw loop it is displayed with [`printOut()`](functions/printOut).

## `notAllowedCharacters` [string]
- A string that contains every character that has been known to break things. If a character exists in this string, you should try not to use it for displaying things.

## `gradients` [array]
- The gradients array is a list of strings where every string is a gradient for use with the [drawing functions](drawing-functions) and the [shape functions](shape-functions). Any given entry in the gradients array represents the characters that a colour will be mapped to. Each gradient is arranged from left to right, and carefully avoid the use of any character from the `notAllowedCharacters` array. Feel free to add your own gradients to this array. The current gradient that is in use can be changed with [`gradientMode()`](functions/gradientMode).

## `currentGradient` [string]
- A string from the `gradients` array that is used to determine the colours in your sketch. By default initialized to the first entry in the `gradients` array.

## `currentStroke` [char]
- The character that is currently being used as the outline of shapes. Can be set using [`charStroke()`](functions/charStroke).

## `currentFill` [char]
- The character that is currently being used as the fill colour of shapes. Can be set using [`charFill()`](functions/charFill).

## `currentTranslation` [1x2 array]
- A list in the format [x, y] that stores the current translation information. 

## `coordinateMode` [string] 
- A string that either contains `'screen'` or `'char'`. Used by [shape functions](shape-functions) to change how coordinates are interpreted.

## `cubeVertices` [const 1 by 24 array]
- A 3x8 array of cube vertex coordinates that has been flattened into a 1x24 array. Mainly used for debugging 3D stuff, which doesn't currently work.

## `cubeEdges` [const 1 by 24 array]
- A 2x12 array of connections between cube vertices that has been flattened into a 1x12 array. Mainly used for debugging 3D stuff, which doesn't currently work.
