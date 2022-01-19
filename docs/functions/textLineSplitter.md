# `textLineSplitter()`

## Description
`textLineSplitter()` takes in a string and splits it into various lines according to `lineWidth`.

## Syntax
`textLineSplitter(text, lineWidth)`
> `text`: The text to be split

> `lineWidth`: The maximum width (in characters) that one line can be.

## Returns
A list of the different lines that the text has been split into.

## Example
```
textLineSplitter('the quick brown fox jumps over the lazy dog', 10)
output:
[
    'the quick',
    'brown fox',
    'jumps over',
    'the lazy',
    'dog'
]
```