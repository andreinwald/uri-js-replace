import {normalize, URIComponents} from "./index";
import {parse} from "./Parse";
import {serialize} from "./Serialize";

export function resolve(baseURI: string, relativeURI: string): string {
    return serialize(resolveComponents(parse(baseURI), parse(relativeURI)));
}

export function resolveComponents(base: URIComponents, relative: URIComponents): URIComponents {
    const target: URIComponents = {path: ''};

    base = normalize(base);
    relative = normalize(relative);

    if (relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }

    target.fragment = relative.fragment;

    return target;
}


function removeDotSegments(input: string): string {
    // Copied just for "resolveComponents" method

    const RDS1 = /^\.\.?\//;
    const RDS2 = /^\/\.(\/|$)/;
    const RDS3 = /^\/\.\.(\/|$)/;
    const RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;

    const output: Array<string> = [];

    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            const im = input.match(RDS5);
            if (im) {
                const s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}
