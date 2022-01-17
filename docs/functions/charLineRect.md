# `charLineRect()`

## Description
`charLineRect()` draws ***only the outline*** of a rectangle on the sketch. It is essentially the same as [`charRect()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. Note: both the width and the height **must** be positive and both are affected by [`coordinateMode()`](coordinateMode).

## Syntax
`charLineRect(x, y, w, h, char)`
> `x`: X coordinate of top left point

> `y`: Y coordinate of top left point

> `w`: Width of the rectangle

> `h`: Height of the rectangle


> `char`: optional - Character to use for the lines. By default set to `currentStroke`.

## Returns
Nothing