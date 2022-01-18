# `charLineCircle()`

## Description
`charLineCircle()` draws ***only the outline*** of a circle on the sketch centered at `x`, `y`. It is essentially the same as [`charCircle()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. Note: the radius **is** affected by [`setCoordinateMode()`](setCoordinateMode) and it is expressed **horizontally**. That is, that if `coordinateMode` is set to `CHAR`, `r` will refer to the number of characters going horizontally as the radius.

## Syntax
`charLineCircle(x, y, r, char)`
> `x`: X coordinate of the centre point

> `y`: Y coordinate of the centre point

> `r`: Radius of the circle

> `char`: optional - Character to use for the outline. By default set to `currentStroke`.

## Returns
A list of the coordinates (in char coordinates) of all the points it drew, in the format:
```
[
    [x1, y1],
    [x2, y2],
    [x3, y3],
    ...
    [xn, yn]
]
```
where n is the number of points drawn. Note: the points are not necessarily in order, which is why [`sortByY()`](sortByY) exists.