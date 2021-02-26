---
title: Throttling
---

You should not call the validator more often than **1 req/sec**. From W3C’s [manual](https://jigsaw.w3.org/css-validator/manual.html):

> If you wish to call the validator programmatically for a batch of documents, please make sure that your script will sleep for at least 1 second between requests. The CSS Validation service is a free, public service for all, your respect is appreciated.