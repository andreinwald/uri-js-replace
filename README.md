# URI parsing/validating/resolving library
**Replacement for abandoned library** [uri-js](https://www.npmjs.com/package/uri-js) aka "URI.js"<br>

- Based on Node.js/browser URL.
- Without using of deprecated punycode api. <br>
- Works in Node and browser

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
###Serializing

```js
URI.serialize({scheme : "http", host : "example.com", fragment : "footer"}) === "http://example.com/#footer"
```

### Resolving
```js
URI.resolve("uri://a/b/c/d?q", "../../g") === "uri://a/g"
```

### Normalizing
```js
URI.normalize("HTTP://ABC.com:80/%7Esmith/home.html") === "http://abc.com/~smith/home.html"
```
### Comparison
```js
URI.equal("example://a/b/c/%7Bfoo%7D", "eXAMPLE://a/./b/../b/%63/%7bfoo%7d") === true
```

## Tests
All tests copied from original repository
```shell
vitest
```

## NPM
https://www.npmjs.com/package/uri-js-replace
```
