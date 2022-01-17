# `gradientStyle()`

## Description
`gradientStyle()` changes the look of the sketch by selecting a different gradient from the gradients array.

## Syntax
`gradientStyle(index)`
> `index`: Index of desired gradient in the `gradients` array

## Returns
Nothing

## Example
After running the following code, `currentGradient` = `'ghi'`.
```
let gradients = [
    'abc',
    'def',
    'ghi'
];

gradientStyle(2);
```