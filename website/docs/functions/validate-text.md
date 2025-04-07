---
title: validateText()
---

This function is used to validate CSS contained within a string.

##  Options

You can customize the behavior with options, passed as the second argument.

Option | Default | Possible values
:--- | :--- | :---
`medium` | `all` | `all`, `braille`, `embossed`, `handheld`, `print`, `projection`, `screen`, `speech`, `tty`, `tv`
`warningLevel` | `0` | `0`, `1`, `2`, `3`
`timeout` | `10000` | `integer`

Option | Explanation
:--- | :---
`medium` | The equivalent of the `@media` rule, applied to all of the CSS
`warningLevel` | `0` means don’t return any warnings; `1`, `2`, `3` will return warnings (if any), with higher numbers corresponding to more warnings
`timeout` | The time in milliseconds after which the request to the W3C API will be terminated and an error will be thrown

```ts
const result = await cssValidator.validateText(css, {
    medium: 'print',
    warningLevel: 3,
    timeout: 3000,
});
```

## Response structure

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
