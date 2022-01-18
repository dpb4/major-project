# `putText()`

## Description
`putText()` places a string at a given location on the sketch. It starts from the given location and writes the string to the right. It does not do any text wrapping, it just places a line of text.

## Syntax
`putText(text, x, y, mode, safetyOverride)`
> `text`: The text to be displayed

> `x`: The X coordinate of the leftmost character.

> `y`: the Y coordinate of the leftmost character.

> `mode`: optional - either `SCREEN` or `CHAR`. Controls which coordinate mode to use.

> `safetyOverride`: optional - Either true or false. By default set to false. If `safetyOverride` is false, any character in `text` that is also in `notAllowedCharacters` will not be drawn. It may be less readable, but it won't break anything.

## Returns
Nothing

## Example

```
putText('a b c (d)', 3, 3, CHAR, false)
output:
######################
######################
######################
###a#b#c##d###########
######################
######################

putText('a b c (d)', 3, 3, CHAR, true)
output:
######################
######################
######################
###a b c (d)##########
######################
######################
```