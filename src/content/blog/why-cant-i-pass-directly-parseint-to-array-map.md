---
title: Why can’t I pass directly parseInt to Array.map?
description: Don't do [].map(parseInt)!
pubDate: 2021-12-10
heroImage: https://miro.medium.com/v2/resize:fit:720/format:webp/1*OUM0IENQBqeetjcUGvAQpA.png
language: en
---

I’d like to share something I learned thanks to the [Advent of Code 2021](https://github.com/iwazaru/advent-of-code). If you need to convert an array of strings into array of integers (which you’ll need to do often while participating in the advent of code), you might use the [Array.map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method and the [parseInt](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt) function and write something like:

```js
['121', '223', '362'].map((string) => parseInt(string));
```

Which would return an array of integers: `[121, 223, 362]`

Great, but now, as the middle arrow function only calls `parseInt` with the argument it receives, you might want to simplify this statement by passing directly the `parseInt` function to the `map` method.

```js
['121', '223', '362'].map(parseInt);
```

I’ve done these kinds of simplifications dozens of times, and it always worked like a charm. But in this particular case, the returned value was not what I expected: `[121, NaN, NaN]`

What is going on here? Why does the array contains a correct result for the first entry, but `NaN` for the second and third? You might think (as I did) that the first and second way of calling `parseInt` are similar. So what? It might seem obvious to some readers, but I scratched my head some time to find the answer.

The explanation is that `parseInt` can take a second argument to specify the arithmetic base of the string to parse as an int (by default, 10). The exact function signature is `parseInt(string, base)`.

Now, the callback function passed as a parameter to the `map` method will be called with three arguments : its signature is `mapCallback(current, index, array)`. Thus, `parseInt` is called with `index` as the second parameter `base`.

```js
mapCallback(current, index, array);  
           /* ↓       ↓ */  
   parseInt(string, base);
```

So calling the map method on the `['121', '223', '362']` array, `parseInt` will be called three times with the following argument :

```js
parseInt('121', 0, ['121', '223', '362']);  
parseInt('223', 1, ['121', '223', '362']);  
parseInt('362', 2, ['121', '223', '362']);
```

*   calling `parseInt` with `0` as `base` returns `121` because it falls back to the default value `10`\*
*   calling `parseInt` with `1` as `base`returns `Nan`because base `1` makes no sense
*   when called with `2` as `base`, `parseInt` expect to receive a string representing a binary number, ie made of only 1 and 0

So here it is ! If you want to simplify `array.map((item) => myFunction(item))` to `array.map(myFunction)`, be sure that `myFunction` does not expect, as a second argument, something else that the current element index.

* Thanks to my coworker Vincent Hardouin for pointing out that this a gross oversimplification of what really happens. To be safe, you should always specify the`base` argument instead of assuming it will default to `10` ([MDN explains why here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#:~:text=A%20value%20passed,is%2010%20(decimal).)).
