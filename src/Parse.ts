import {URL} from "node:url";
import {URIComponents, URIOptions} from "./index";

export function parse(uriString: string, options: URIOptions = {}): URIComponents {
    let parsed;
    let addedDefaultScheme = false;

    if (uriString === '') {
        throw new Error('URL cant be empty (uri-js-replace library)');
    }

    try {
        parsed = new URL(uriString);
    } catch (firstError) {
        firstError.message = firstError.message + ` "${uriString}" (uri-js-replace library)`;
        if (uriString.startsWith('//')) {
            try {
                parsed = new URL('http:' + uriString);
                addedDefaultScheme = true;
            } catch (otherError) {
                throw firstError;
            }
        } else {
            throw firstError;
        }
    }
    let result: URIComponents = {
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
