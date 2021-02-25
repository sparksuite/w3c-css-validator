// Make sure it runs in Node.js outside the context of Jest
//  -> Jest injects global variables into the runtime environment, which can alter behavior
require('w3c-css-validator').validateText('.foo { text-align: center; }');
