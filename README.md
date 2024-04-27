# URI parsing/validating/resolving library
**Replacement for abandoned library** [uri-js](https://www.npmjs.com/package/uri-js) aka "URI.js"<br>

- Based on Node.js/browser [URL api](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- Without using of deprecated punycode
- Solves "The punycode module is deprecated" warning
- Works in Node.js and browser
- Tested with libraries: ESLint, Webpack, [Ajv](https://github.com/ajv-validator/ajv)

### Add to your package.json
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

### Or install from scratch
```shell
npm i uri-js-replace
```
```js
import * as URI from "uri-js";
```

## Tested with libraries
- [Ajv](https://github.com/ajv-validator/ajv)

## Usage examples
### Parsing
```js
URI.parse("uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body");
//returns:
//{
//  scheme : "uri",
//  userinfo : "user:pass",
//  host : "example.com",
//  port : 123,
//  path : "/one/two.three",
//  query : "q1=a1&q2=a2",
//  fragment : "body"
//}
```

### Serializing

```js
URI.serialize({scheme : "http", host : "example.com", fragment : "footer"}) === "http://example.com/#footer"
```

### Normalizing
```js
URI.normalize("HTTP://ABC.com:80/%7Esmith/home.html") === "http://abc.com/~smith/home.html"
```

## Tests
All tests copied from original repository
```shell
vitest
```

## NPM
https://www.npmjs.com/package/uri-js-replace

