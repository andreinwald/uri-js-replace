"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const node_url_1 = require("node:url");
function serialize(components, options = {}) {
    var _a, _b;
    let temporaryHost = '_remove_me_host_';
    let startUrl = ((_a = components.scheme) !== null && _a !== void 0 ? _a : 'http') + '://' + ((_b = components.host) !== null && _b !== void 0 ? _b : temporaryHost);
    let urlBuilder;
    try {
        urlBuilder = new node_url_1.URL(startUrl);
    }
    catch (error) {
        console.error(error.message + ' ' + startUrl);
        return '';
    }
    if (components.scheme) {
        urlBuilder.protocol = components.scheme;
    }
    if (components.port) {
        urlBuilder.port = String(components.port);
    }
    if (components.host !== undefined) {
        urlBuilder.host = components.host;
    }
    else {
        urlBuilder.host = '';
    }
    if (components.path) {
        urlBuilder.pathname = components.path;
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
    let result = urlBuilder.toString();
    if (!components.scheme) {
        result = result.substring(5);
    }
    if (!components.path && result.endsWith('/')) {
        result = result.slice(0, -1);
    }
    if (components.host === undefined) {
        result = result.replace(temporaryHost, '');
    }
    if (!result.match(/[^\/]/)) { // only // left
        return '';
    }
    return result.toLowerCase();
}
exports.serialize = serialize;
