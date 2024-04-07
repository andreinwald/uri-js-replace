import {URL} from "node:url";

export function parse(uriString: string, options: URIOptions = {}): URIComponents {
    let parsed;
    let addedDefaultScheme = false;
    try {
        parsed = new URL(uriString);
    } catch (firstError) {
        firstError.message = firstError.message + ' ' + uriString;
        if (uriString.startsWith('//')) {
            try {
                parsed = new URL('http:' + uriString);
                addedDefaultScheme = true;
            } catch (otherError) {
                firstError.message = firstError.message + ' or ' + 'http:' + uriString;
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

export function serialize(components: URIComponents, options: URIOptions = {}): string {
    let startUrl = (components.scheme ?? 'http') + '://' + (components.host ?? '_removemehost_');
    let urlBuilder;
    try {
        urlBuilder = new URL(startUrl);
    } catch (error) {
        error.message = error.message + ' ' + startUrl;
        throw error;
    }
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
    if (!components.scheme) {
        result = result.substring(5);
    }
    if (!components.host) {
        result = result.replace('_removemehost_', '');
    }
    if (!result.match(/[^\/]/)) {
        return '';
    }
    if (!components.path && result.endsWith('/')) {
        result = result.slice(0, -1);
    }
    return result.toLowerCase();
}

export function equal(uriA: URIComponents | string, uriB: URIComponents | string, options?: URIOptions): boolean {
    let processedA;
    let processedB;

    if (typeof uriA === "string") {
        processedA = serialize(parse(uriA, options), options);
    } else if (typeof uriA === "object") {
        processedA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        processedB = serialize(parse(uriB, options), options);
    } else if (typeof uriB === "object") {
        processedB = serialize(uriB, options);
    }
    if (processedA !== processedB) {
        console.log(processedA);
        console.log(processedB);
    }
    return processedA === processedB;
}


export function resolve(baseURI: string, relativeURI: string, options?: URIOptions): string {
    // TODO
    console.error("Method resolve in URI.js not implemented yet")
    return baseURI.toLowerCase();
}

export function normalize(uri: URIComponents | string, options?: URIOptions): URIComponents | string {
    if (typeof uri === "string") {
        return serialize(parse(uri));
    } else {
        return parse(serialize(uri));
    }
}

export function pctEncChar(chr: string): string {
    // TODO
    console.error("Method pctEncChar in URI.js not implemented yet")
    return chr;
}

export function pctDecChars(str: string): string {
    // TODO
    console.error("Method pctDecChars in URI.js not implemented yet")
    return str;
}

export function removeDotSegments(input: string): string {
    // TODO
    console.error("Method removeDotSegments in URI.js not implemented yet")
    return input;
}

export function resolveComponents(base: URIComponents, relative: URIComponents, options?: URIOptions, skipNormalization?: boolean): URIComponents {
    // TODO
    console.error("Method resolveComponents in URI.js not implemented yet")
    return base;
}

export function escapeComponent(str: string, options?: URIOptions): string {
    // TODO
    console.error("Method escapeComponent in URI.js not implemented yet")
    return str;
}

export function unescapeComponent(str: string, options?: URIOptions): string {
    // TODO
    console.error("Method unescapeComponent in URI.js not implemented yet")
    return str;
}


export interface URIComponents {
    scheme?: string;
    userinfo?: string;
    host?: string;
    port?: number | string;
    path?: string;
    query?: string;
    fragment?: string;
    reference?: string;
    error?: string;
}

export interface URIOptions {
    scheme?: string;
    reference?: string;
    tolerant?: boolean;
    absolutePath?: boolean;
    iri?: boolean;
    unicodeSupport?: boolean;
    domainHost?: boolean;
}

export interface URISchemeHandler<Components extends URIComponents = URIComponents, Options extends URIOptions = URIOptions, ParentComponents extends URIComponents = URIComponents> {
    scheme: string;

    parse(components: ParentComponents, options: Options): Components;

    serialize(components: Components, options: Options): ParentComponents;

    unicodeSupport?: boolean;
    domainHost?: boolean;
    absolutePath?: boolean;
}

export interface URIRegExps {
    NOT_SCHEME: RegExp;
    NOT_USERINFO: RegExp;
    NOT_HOST: RegExp;
    NOT_PATH: RegExp;
    NOT_PATH_NOSCHEME: RegExp;
    NOT_QUERY: RegExp;
    NOT_FRAGMENT: RegExp;
    ESCAPE: RegExp;
    UNRESERVED: RegExp;
    OTHER_CHARS: RegExp;
    PCT_ENCODED: RegExp;
    IPV4ADDRESS: RegExp;
    IPV6ADDRESS: RegExp;
}

export declare const SCHEMES: {
    [scheme: string]: URISchemeHandler;
};
