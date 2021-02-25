# W3C CSS Validator
A modern package for validating CSS using [W3C’s public CSS validator service](https://jigsaw.w3.org/css-validator/). Its goal is to simplify and standardize the API that W3C exposes, so that it adheres to newer conventions and is intuitive and easy to use.

- 📦 Written entirely in TypeScript
- 🔬 Thoroughly tested
- ⚡️ Zero dependencies
- 🤝 Promise-based design
- ✨ Tiny size
- 🌎 Works in Node.js and browsers

## Getting started

Install with Yarn or npm:

```
yarn add w3c-css-validator
```

```
npm install w3c-css-validator
```

Import or require:

```ts
import cssValidator from 'w3c-css-validator';
```

```ts
const cssValidator = require('w3c-css-validator');
```

Validate some CSS:

```ts
const result = await cssValidator.validateText('.foo { text-align: center; }');

/*
Result will be:

{
    valid: true,
    errors: [],
}
*/
```

## `cssValidator.validateText()`

This function is used to validate CSS contained within a string.

###  Options

You can customize the behavior with options, passed as the second argument.

Option | Default | Possible values
:--- | :--- | :---
`medium` | `all` | `all`, `braille`, `embossed`, `handheld`, `print`, `projection`, `screen`, `speech`, `tty`, `tv`
`warningLevel` | `0` | `0`, `1`, `2`, `3`

Option | Explanation
:--- | :---
`medium` | The equivalent of the `@media` rule, applied to all of the CSS
`warningLevel` | `0` means don’t return any warnings; `1`, `2`, `3` will return warnings (if any), with higher numbers corresponding to more warnings

Example:

```ts
const result = await cssValidator.validateText(css, {
    medium: 'print',
    warningLevel: 3,
});
```

### Response structure

By default, the function returns a Promise, which resolves to an object that looks like:

```ts
{
    valid: boolean;
    errors: {
        line: number;
        message: string;
    }[];
}
```

If you ask it to return warnings via `warningLevel`, it will also include a `warnings` key:

```ts
{
    ...
    warnings: {
        line: number;
        level: 1 | 2 | 3;
        message: string;
    }[];
}
```

## Errors vs. warnings

From W3C’s [manual](https://jigsaw.w3.org/css-validator/manual.html):

> The validator can give you two types of messages: errors and warnings. Errors are given when the checked CSS does not respect the CSS recommendation. Warnings are different from errors since they do not state a problem regarding the specification. They are here to warn that some points might be dangerous and could lead to a strange behavior on some user agents.

## Throttling

You should not call the validator more often than **1 req/sec**. From W3C’s [manual](https://jigsaw.w3.org/css-validator/manual.html):

> If you wish to call the validator programmatically for a batch of documents, please make sure that your script will sleep for at least 1 second between requests. The CSS Validation service is a free, public service for all, your respect is appreciated.

## Local development

To test the whole project, run `yarn test`.

To format the code, run `yarn format`.

To clean the repository (removes any programmatically generated files), run `yarn clean`.
