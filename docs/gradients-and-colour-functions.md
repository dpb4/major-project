# Gradient and Colour functions

## Colour functions
- [`charFill()`](functions/charFill)
- [`charStroke()`](functions/charStroke)
- [`charBackground()`](functions/charBackground)

## Gradient functions
- [`gradientStyle()`](functions/gradientStyle)
- [`gradientTest()`](functions/gradientTest)
- [`colourMapper()`](functions/colourMapper)

----

## Tips for making your own gradients
The gradient of your sketch can completely change how it looks. Picking the right one is integral to making your sketch look nice.
- Using fewer characters in a gradient can make the colours more distinct but there will be lower fidelity.
- [`gradientTest()`](functions/gradientTest) is your friend and it makes it very easy to compare colours. Standing back and squinting also gives you a more general view of the value of each segment.
- Try to use characters that are "well distributed" meaning that they take up a lot of width and height. For example, `*` and `o` have a similar brightness, but the `o` takes up more space. Characters that are poorly distibuted such as `|` tend to look darker than they actually are.
- Avoid any character from `notAllowedCharacters` because they tend to break things.
- Make sure your gradient string is arranged from darkest to lightest, otherwise the sketch will be in inverted colours.