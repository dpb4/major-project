# `charLine()`

## Description
`charLine()` draws a line between two given points. By default uses `currentStroke` as the character but it can be set directly with `char`.

## Syntax
`charLine(x1, y1, x2, y2, char)`
> `x1`: X coordinate of first point

> `y1`: Y coordinate of first point

> `x2`: X coordinate of second point

> `y2`: Y coordinate of second point

> `char`: optional - Character to use for the line. By default set to `currentStroke`.

## Returns
A list of all the coordinates of the points that the line drew (in character coordinates), in the format:
```
[
    [x1, y1],
    [x2, y2],
    [x3, y3],
    ...
    [xn, yn]
]
```
where n is the number of points in the line.