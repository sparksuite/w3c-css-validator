---
title: Alternative validator service
---

You can provide a self-hosted alternative validator service, as long as it’s compatible with the W3C CSS Validator API.

To use an alternative service, set `CSS_VALIDATOR_URL` to the base URL of the alternative validator service in an environment-appropriate way:
- **Node.js:** Set the `CSS_VALIDATOR_URL` environment variable
- **Browser:** Set `window.CSS_VALIDATOR_URL`

A `Dockerfile` is contained in the GitHub repository and can be launched with `yarn run server` or referenced to build your own alternative service.