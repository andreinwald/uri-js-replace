export * from "./Resolve";
export * from "./Serialize";
export * from "./Parse";
export declare function equal(uriA: URIComponents | string, uriB: URIComponents | string, options?: URIOptions): boolean;
export declare function normalize(uri: URIComponents): URIComponents;
export declare function normalize(uri: string): string;
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
