# `charLineTriangle()`

## Description
`charLineTriangle()` draws ***only the outline*** of a triangle on the sketch. It is essentially the same as [`charTriangle()`](charTriangle.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart.

## Syntax
`charLineTriangle(x1, y1, x2, y2, x3, y3)`
> `x1`: X coordinate of first point

> `y1`: Y coordinate of first point

> `x2`: X coordinate of second point

> `y2`: Y coordinate of second point

> `x3`: X coordinate of third point

> `y3`: Y coordinate of third point

> `char`: optional - Character to use for the lines. By default set to `currentStroke`.

## Returns
Nothing