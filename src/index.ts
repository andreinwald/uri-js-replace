import {serialize} from "./Serialize";
import {parse} from "./Parse";


export * from "./Resolve";
export * from "./Serialize";
export * from "./Parse";

export function equal(uriA: URIComponents | string, uriB: URIComponents | string): boolean {
    let processedA;
    let processedB;

    if (typeof uriA === "string") {
        processedA = serialize(parse(uriA));
    } else {
        processedA = serialize(uriA);
    }
    if (typeof uriB === "string") {
        processedB = serialize(parse(uriB));
    } else {
        processedB = serialize(uriB);
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
    scheme?: string | undefined;
    userinfo?: string | undefined;
    host?: string | undefined;
    port?: number | string | undefined;
    path?: string | undefined;
    query?: string | undefined;
    fragment?: string | undefined;
    reference?: string | undefined;
    error?: string | undefined;
}

export interface URIOptions {
    scheme?: string | undefined;
    reference?: string | undefined;
    tolerant?: boolean | undefined;
    absolutePath?: boolean | undefined;
    iri?: boolean | undefined;
    unicodeSupport?: boolean | undefined;
    domainHost?: boolean | undefined;
}

