---
title: Alternative validator service
---

You can provide a self-hosted alternative validator service hosted on your own platform.

To use an alternative service update the `CSS_VALIDATOR_URL` to the base URL of the css-validated hosted by you depending on your use case:
  * Node.js: Set the environment variable `CSS_VALIDATOR_URL`
  * Browser: Set `window.CSS_VALIDATOR_URL`

A `Dockerfile` is provided with this packages source and can be launched locally with `yarn run server` or copied and built into your own platform.  