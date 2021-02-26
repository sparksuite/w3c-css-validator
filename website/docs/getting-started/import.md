---
title: Import
---

After installing the package, import or require the package:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="module-type"
defaultValue="esm"
values={[
{label: 'ESM', value: 'esm'},
{label: 'CommonJS', value: 'cjs'},
]}>
<TabItem value="esm">

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