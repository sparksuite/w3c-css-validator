---
title: Import
---

After installing the package, import or require the package:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="module-type"
defaultValue="es6"
values={[
{label: 'ES6', value: 'es6'},
{label: 'CommonJS', value: 'cjs'},
]}>
<TabItem value="es6">

```ts
import cssValidator from 'w3c-css-validator';
```

</TabItem>
<TabItem value="cjs">

```ts
const cssValidator = require('w3c-css-validator');
```

</TabItem>
</Tabs>