"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
function serialize(components) {
    let temporaryHostAndScheme = 'https://_remove_me_host_';
    let temporaryHost = '_remove_me_host_';
    let temporaryScheme = 'https://';
    let temporarySchemeUsed = false;
    let temporaryHostUsed = false;
    let temporaryHostAndSchemeUsed = false;
    let startUrl = '';
    if (components.scheme && components.host) {
        startUrl = components.scheme + '://' + components.host;
    }
    if (!components.host && components.scheme) {
        temporaryHostUsed = true;
        startUrl = components.scheme + '://' + temporaryHost;
    }
    if (components.host && !components.scheme) {
        temporarySchemeUsed = true;
        startUrl = temporaryScheme + components.host;
    }
    if (!components.host && !components.scheme) {
        temporaryHostAndSchemeUsed = true;
        startUrl = temporaryHostAndScheme;
    }
    let urlBuilder;
    try {
        urlBuilder = new URL(startUrl);
    }
    catch (error) {
        if (error.message) {
            console.error(error.message + ' ' + startUrl);
        }
        return '';
    }
    if (components.scheme) {
        urlBuilder.protocol = components.scheme.toLowerCase();
    }
    if (components.port) {
        urlBuilder.port = String(components.port);
    }
    if (components.host !== undefined && !temporaryHostUsed) {
        urlBuilder.host = components.host;
    }
    else {
        urlBuilder.host = '';
    }
    if (components.path) {
        urlBuilder.pathname = components.path;
    }
    else {
        urlBuilder.pathname = '';
    }
    if (components.userinfo) {
        let parts = components.userinfo.split(':');
        if (parts[0]) {
            urlBuilder.username = parts[0];
        }
        if (parts[1]) {
            urlBuilder.password = parts[1];
        }
    }
    if (components.query) {
        urlBuilder.search = components.query;
    }
    if (components.fragment) {
        urlBuilder.hash = components.fragment;
    }
    let result = urlBuilder.toString();
    if (!components.path && result.endsWith('/')) {
        result = result.slice(0, -1);
    }
    if (temporaryHostAndSchemeUsed) {
        result = result.replace(temporaryHostAndScheme, '');
        if (result.startsWith('/')) {
            result = result.slice(1);
        }
    }
    if (temporaryHostUsed) {
        result = result.replace(temporaryHost, '');
    }
    if (temporarySchemeUsed) {
        result = result.replace(temporaryScheme, '');
    }
    if (!result.match(/[^\/]/)) {
        return '';
    }
    return result;
}
exports.serialize = serialize;
