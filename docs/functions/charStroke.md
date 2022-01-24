# `charStroke()`

## Description
`charStroke()` changes the outline colour of any shapes drawn. Analagous to `stroke()` in p5. If `col` is a float between 0 and 1, it will use [`colourMapper()`](colourMapper) to determine the corresponding character. Otherwise if `col` is a character, it will outline shapes with that character directly. Beware `notAllowedCharacters` if using direct characters.

## Syntax
`charStroke(col)`
> `col`: Number between 0 and 1 *or* character

## Returns
Nothing