# Drop-in replacement for abandoned uri-js

Use it in `package.json` to override the abandoned [uri-js](https://www.npmjs.com/package/uri-js) package.

- 99.9% compatible with the original API
- Drop-in tested with large users (ESLint, Webpack, [Ajv](https://github.com/ajv-validator/ajv))
- Based on the WHATWG [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) standard
- Works in Node.js and browsers
- Avoids the vulnerabilities in the original: CVE-2026-93690, CVE-2026-93751, and CVE-2017-16021


# Usage
## NPM
Add to your package.json
```json
{
  "overrides": {
    "uri-js": "npm:uri-js-replace"
  }
}
```
and run
```shell
npm update
```

## Yarn
```json
{
  "resolutions": {
    "uri-js": "npm:uri-js-replace"
  }
}
```

## NPM
https://www.npmjs.com/package/uri-js-replace
