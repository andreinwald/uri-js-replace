"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescapeComponent = exports.escapeComponent = exports.resolveComponents = exports.removeDotSegments = exports.pctDecChars = exports.pctEncChar = exports.normalize = exports.resolve = exports.equal = exports.serialize = exports.parse = void 0;
const node_url_1 = require("node:url");
function parse(uriString, options = {}) {
    let parsed;
    try {
        parsed = new node_url_1.URL(uriString);
    }
    catch (error) {
        console.log(uriString);
        throw error;
    }
    return {
        scheme: String(parsed.protocol).replace(':', ''),
        userinfo: parsed.username ? parsed.username + ':' + parsed.password : undefined,
        host: parsed.hostname && parsed.hostname.length ? parsed.hostname : undefined,
        port: parsed.port ? Number(parsed.port) : undefined,
        path: parsed.pathname,
        query: parsed.search ? parsed.search.replace('?', '') : undefined,
        fragment: parsed.hash ? parsed.hash.replace('#', '') : undefined,
    };
}
exports.parse = parse;
function serialize(components, options = {}) {
    let urlBuilder = new node_url_1.URL('remove://remove');
    if (components.port) {
        urlBuilder.port = String(components.port);
    }
    if (components.host) {
        urlBuilder.host = components.host;
    }
    if (components.scheme) {
        urlBuilder.protocol = components.scheme;
    }
    if (components.userinfo) {
        let parts = components.userinfo.split(':');
        urlBuilder.username = parts[0];
        urlBuilder.password = parts[1];
    }
    if (components.query) {
        urlBuilder.search = components.query;
    }
    if (components.fragment) {
        urlBuilder.hash = components.fragment;
    }
    if (components.path) {
        urlBuilder.pathname = components.path;
    }
    let result = urlBuilder.toString();
    if (result === 'remove://remove') {
        return '';
    }
    return result;
}
exports.serialize = serialize;
function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    }
    else if (typeof uriA === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    }
    else if (typeof uriB === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}
exports.equal = equal;
function resolve(baseURI, relativeURI, options) {
    // TODO
    console.error("Method resolve in URI.js not implemented yet");
    return baseURI.toLowerCase();
}
exports.resolve = resolve;
function normalize(uri, options) {
    // TODO
    console.error("Method normalize in URI.js not implemented yet");
    return uri;
}
exports.normalize = normalize;
function pctEncChar(chr) {
    // TODO
    console.error("Method pctEncChar in URI.js not implemented yet");
    return chr;
}
exports.pctEncChar = pctEncChar;
function pctDecChars(str) {
    // TODO
    console.error("Method pctDecChars in URI.js not implemented yet");
    return str;
}
exports.pctDecChars = pctDecChars;
function removeDotSegments(input) {
    // TODO
    console.error("Method removeDotSegments in URI.js not implemented yet");
    return input;
}
exports.removeDotSegments = removeDotSegments;
function resolveComponents(base, relative, options, skipNormalization) {
    // TODO
    console.error("Method resolveComponents in URI.js not implemented yet");
    return base;
}
exports.resolveComponents = resolveComponents;
function escapeComponent(str, options) {
    // TODO
    console.error("Method escapeComponent in URI.js not implemented yet");
    return str;
}
exports.escapeComponent = escapeComponent;
function unescapeComponent(str, options) {
    // TODO
    console.error("Method unescapeComponent in URI.js not implemented yet");
    return str;
}
exports.unescapeComponent = unescapeComponent;
