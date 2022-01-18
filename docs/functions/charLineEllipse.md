# `charLineEllipse()`

## Description
`charLineEllipse()` draws ***only the outline*** of an ellipse on the sketch. It is essentially the same as [`charEllipse()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. Note: both the width are affected by [`coordinateMode()`](coordinateMode).

## Syntax
`charLineEllipse(x, y, w, h, char)`
> `x`: X coordinate of the centre point

> `y`: Y coordinate of the centre point

> `w`: Width of the ellipse

> `h`: Height of the ellipse

> `char`: optional - Character to use for the lines. By default set to `currentStroke`.

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