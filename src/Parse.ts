import {URL} from "node:url";
import {URIComponents, URIOptions} from "./index";

export function parse(uriString: string, options: URIOptions = {}): URIComponents {
    let temporaryHost = '_remove_me_host_';
    let result: URIComponents = {path: ''};
    if (uriString.includes('#')) {
        result.fragment = '';
    }
    let parsed;
    let addedDefaultScheme = false;
    let addedTemporaryHost = false;

    try {
        parsed = new URL(uriString);
    } catch (firstError) {
        if (uriString.startsWith('//')) {
            try {
                parsed = new URL('https:' + uriString);
                addedDefaultScheme = true;
            } catch (otherError) {
                result.error = firstError.message;
                return result;
            }
        } else {
            try {
                parsed = new URL('https://' + uriString);
                addedDefaultScheme = true;
            } catch (otherError) {
                try {
                    parsed = new URL('https://' + temporaryHost + uriString);
                    addedDefaultScheme = true;
                    addedTemporaryHost = true;
                } catch (otherError) {
                    result.error = firstError.message;
                    return result;
                }
            }
        }
    }
    if (typeof parsed.protocol !== undefined && parsed.protocol !== '' && !addedDefaultScheme) {
        result.scheme = String(parsed.protocol).replace(':', '');
    }

    if (typeof parsed.username !== undefined && parsed.username !== '') {
        result.userinfo = parsed.username + ':' + parsed.password;
    }

    if (typeof parsed.hostname !== undefined && parsed.hostname !== '' && !addedTemporaryHost) {
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
    // console.log(`parse "${uriString}" options:`, options, ' to ', result);
    return result;
}
