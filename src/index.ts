import {URL} from "node:url";

export function parse(uriString: string, options: URIOptions = {}): URIComponents {
    let parsed;
    try {
        parsed = new URL(uriString);
    } catch (error) {
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

export function serialize(components: URIComponents, options: URIOptions = {}): string {
    let urlBuilder = new URL('remove://remove');
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

export function equal(uriA: URIComponents | string, uriB: URIComponents | string, options?: URIOptions): boolean {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeof uriA === "object") {
        uriA = serialize(<URIComponents>uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeof uriB === "object") {
        uriB = serialize(<URIComponents>uriB, options);
    }
    return uriA === uriB;
}


export function resolve(baseURI: string, relativeURI: string, options?: URIOptions): string {
    // TODO
    console.error("Method resolve in URI.js not implemented yet")
    return baseURI.toLowerCase();
}

export function normalize(uri: URIComponents | string, options?: URIOptions): URIComponents | string {
    // TODO
    console.error("Method normalize in URI.js not implemented yet")
    return uri;
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
