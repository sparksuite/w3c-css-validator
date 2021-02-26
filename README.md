# <div align="center">W3C CSS Validator</div>

<p align="center">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/w3c-css-validator">
<img alt="Codecov" src="https://img.shields.io/codecov/c/github/sparksuite/w3c-css-validator">
<img alt="npm" src="https://img.shields.io/npm/dw/w3c-css-validator">
<img alt="npm" src="https://img.shields.io/npm/v/w3c-css-validator">
<img alt="npm" src="https://img.shields.io/npm/l/w3c-css-validator">
</p>

A modern package for validating CSS using [W3C’s public CSS validator service](https://jigsaw.w3.org/css-validator/). Its goal is to simplify and standardize the API that W3C exposes, so that it adheres to newer conventions and is intuitive and easy to use.

- 📦 Written entirely in TypeScript
- 🔬 Thoroughly tested
- ⚡️ Zero dependencies
- 🤝 Promise-based design
- ✨ Tiny size
- 🌎 Works in Node.js and browsers
- 📖 Thoroughly documented

## Quick start

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
```

## Documentation

Read the docs at: https://sparksuite.github.io/w3c-css-validator/docs/

## Demo

See it in action: https://sparksuite.github.io/w3c-css-validator/demo/

## Contributing

We love contributions! Contributing is easy; [learn how](https://github.com/sparksuite/w3c-css-validator/blob/master/CONTRIBUTING.md).
