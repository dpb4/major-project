# `putImage()`

## Decription
`putImage()` draws an image using ascii characters. Analagous to `image()` in p5. If the image is transparent, anything that is transparent at all will not be drawn (so things that are partially transparent wont work, but if its a transparent background it works fine). 

The image takes in a width and height. If one is provided while the other is zero, the zero will scale to match the one that is provided.

## Syntax
`putImage(img, x, y, w, h)`
> `img`: The image to display

> `x`: The X coordinate of the top left of the image

> `y`: The Y coordinate of the top left of the image

> `w`: The width to display the image

> `h`: The height to display the image
## Example
image is 400x300

`putImage(image, 0, 0, 200, 0)` will draw an image that is 200x150, because the height scaled according to the width.

