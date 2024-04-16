import {serialize} from "./Serialize";
import {parse} from "./Parse";


export * from "./Resolve";
export * from "./Serialize";
export * from "./Parse";

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
    return processedA.toLowerCase() === processedB.toLowerCase();
}


export function normalize(uri: URIComponents): URIComponents;
export function normalize(uri: string): string;
export function normalize(uri: URIComponents | string): URIComponents | string {
    if (typeof uri === "string") {
        return serialize(parse(uri));
    } else {
        return parse(serialize(uri));
    }
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

