---
title: validateURL()
---

This function is used to validate external CSS via a URL.

## Options

You can customize the behavior with options, passed as the second argument.

| Option         | Default | Possible values                                                                                             |
| :------------- | :------ | :---------------------------------------------------------------------------------------------------------- |
| `medium`       | `all`   | `all`, `braille`, `embossed`, `handheld`, `print`, `projection`, `screen`, `speech`, `tty`, `tv`            |
| `warningLevel` | `0`     | `0`, `1`, `2`, `3`                                                                                          |
| `timeout`      | `10000` | `integer`                                                                                                   |
| `profile`      | `css3`  | `none`, `css1`, `css2`, `css21`, `css3`, `css3svg`, `svg`, `svgbasic`, `svgtiny`, `mobile`, `atsc-tv`, `tv` |

| Option         | Explanation                                                                                                                          |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `medium`       | The equivalent of the `@media` rule, applied to all of the CSS                                                                       |
| `warningLevel` | `0` means don’t return any warnings; `1`, `2`, `3` will return warnings (if any), with higher numbers corresponding to more warnings |
| `timeout`      | The time in milliseconds after which the request to the W3C API will be terminated and an error will be thrown                       |
| `profile`      | Specifies the validation profile to use for CSS validation                                                                           |

```ts
const result = await cssValidator.validateURL(cssSourceURL, {
	medium: 'print',
	warningLevel: 3,
	timeout: 3000,
	profile: 'css3svg',
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
		url: string | null;
	}
	[];
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
        url: string | null;
    }[];
}
```
