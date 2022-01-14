# `charFill()`

## Description
`charFill()` changes the inside colour of any shapes drawn. Analagous to `fill()` in p5. If `f` is a float between 0 and 1, it will use [`gradientMapper()`](gradientMapper) to determine the corresponding character. Otherwise if `f` is a character, it will fill shapes with that character directly. Beware `notAllowedCharacters` if using direct characters.

## Syntax
`charFill(f)`
> `f`: Number between 0 and 1 *or* character

## Returns
Nothing