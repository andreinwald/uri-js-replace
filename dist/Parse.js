"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const node_url_1 = require("node:url");
function parse(uriString, options = {}) {
    let parsed;
    let addedDefaultScheme = false;
    if (uriString === '') {
        throw new Error('URL cant be empty (uri-js-replace library)');
    }
    try {
        parsed = new node_url_1.URL(uriString);
    }
    catch (firstError) {
        firstError.message = firstError.message + ` "${uriString}" (uri-js-replace library)`;
        if (uriString.startsWith('//')) {
            try {
                parsed = new node_url_1.URL('http:' + uriString);
                addedDefaultScheme = true;
            }
            catch (otherError) {
                throw firstError;
            }
        }
        else {
            throw firstError;
        }
    }
    let result = {
        path: '',
    };
    if (typeof parsed.protocol !== undefined && parsed.protocol !== '' && !addedDefaultScheme) {
        result.scheme = String(parsed.protocol).replace(':', '');
    }
    if (typeof parsed.username !== undefined && parsed.username !== '') {
        result.userinfo = parsed.username + ':' + parsed.password;
    }
    if (typeof parsed.hostname !== undefined && parsed.hostname !== '') {
        result.host = parsed.hostname;
        if (result.host.startsWith('[')) {
            result.host = result.host.substring(1);
            result.host = result.host.slice(0, -1);
        }
    }
    if (typeof parsed.port !== undefined && parsed.port !== '') {
        result.port = Number(parsed.port);
    }
    if (typeof parsed.pathname !== undefined && parsed.pathname !== '/') {
        result.path = parsed.pathname;
    }
    if (typeof parsed.search !== undefined && parsed.search !== '') {
        result.query = parsed.search.replace('?', '');
    }
    if (typeof parsed.hash !== undefined && parsed.hash !== '') {
        result.fragment = parsed.hash.replace('#', '');
    }
    return result;
}
exports.parse = parse;