# `charTextBox()`

## Description
`charTextBox()` draws a textbox on the sketch to neatly display text. It works by fixing the width, then scaling the height according to the text provided. The outline of the text box is `currentStroke`. The inside of the text box is by default transparent, but can be set to a character with `background`

## Syntax
`charTextBox(text, x, y, width, background)`
> `text`: The text to be displayed

> `x`: The X coordinate of the top left of the text box.

> `y`: the Y coordinate of the top left of the text box.

> `width`: the total width of the text box. It **is** affected by [`setCoordinateMode()`](setCoordinateMode).

> `background`: optional - character to use for the background of the text box. If left undefined, the background will be transparent.

## Returns
Nothing
