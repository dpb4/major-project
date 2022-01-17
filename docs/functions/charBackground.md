# `charBackground()`

## Description
`charBackground()` changes the background colour of the sketch. Analagous to `background()` in p5. If `col` is a float between 0 and 1, it will use [`gradientMapper()`](gradientMapper) to determine the corresponding character. Otherwise if `col` is a character, it will set the background to that character directly. Beware `notAllowedCharacters` if using direct characters.

## Syntax
`charBackground(col)`
> `col`: Number between 0 and 1 *or* character. Default value: `0`.

## Returns
Nothing