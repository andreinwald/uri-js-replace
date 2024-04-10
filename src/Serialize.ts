import {URL} from "node:url";
import {URIComponents, URIOptions} from "./index";

export function serialize(components: URIComponents, options: URIOptions = {}): string {
    let temporaryHost = '_remove_me_host_';
    let startUrl = (components.scheme ?? 'http') + '://' + (components.host ?? temporaryHost);
    let urlBuilder;
    try {
        urlBuilder = new URL(startUrl);
    } catch (error) {
        error.message = error.message + ' ' + startUrl;
        throw error;
    }
    if (components.scheme) {
        urlBuilder.protocol = components.scheme;
    }
    if (components.port) {
        urlBuilder.port = String(components.port);
    }
    if (components.host !== undefined) {
        urlBuilder.host = components.host;
    } else {
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
