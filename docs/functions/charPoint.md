# `charPoint()`

## Description
`charPoint()` places a point at a given location on the text canvas. It can either use the current stroke as the character or it can set a specific character using the `char` argument.

## Syntax
`charPoint(x, y, char, mode)`
> `x`: the x coordinate of the point

> `y`: the y coordinate of the point

> `char`: optional - the character to use as the point. Set to `currentStroke` by default.

> `mode`: optional - either `SCREEN` or `CHAR`. This is really just for internal use, so if you want to work in character coordinates you should use [`setCoordinateMode()`](setCoordinateMode)

# Returns
Nothing