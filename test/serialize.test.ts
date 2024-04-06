import * as URI from '../src'
import {expect, test} from 'vitest'
import {URIComponents} from "../src/types";

function strictEqual(received, expected, comment) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Serialization", function () {
    let components: URIComponents;

    components = {
        scheme: "uri",
        userinfo: "foo:bar",
        host: "example.com",
        port: 1,
        path: "path",
        query: "query",
        fragment: "fragment"
    };
    strictEqual(URI.serialize(components), "uri://foo:bar@example.com:1/path?query#fragment", "All Components");

    components = {
        scheme: undefined,
        userinfo: undefined,
        host: undefined,
        port: undefined,
        path: undefined,
        query: undefined,
        fragment: undefined
    };
    strictEqual(URI.serialize(components), "", "Undefined Components");


    components = {
        scheme: "uri",
        host: "example.com",
        port: "9000",
    };
    strictEqual(URI.serialize(components), "uri://example.com:9000", "String port");

    return;
    // @TODO

    strictEqual(URI.serialize({path: "//path"}), "/%2Fpath", "Double slash path");
    strictEqual(URI.serialize({path: "foo:bar"}), "foo%3Abar", "Colon path");
    strictEqual(URI.serialize({path: "?query"}), "%3Fquery", "Query path");

    //mixed IPv4address & reg-name, example from terion-name (https://github.com/garycourt/uri-js/issues/4)
    strictEqual(URI.serialize({host: "10.10.10.10.example.com"}), "//10.10.10.10.example.com", "Mixed IPv4address & reg-name");

    //IPv6address
    strictEqual(URI.serialize({host: "2001:db8::7"}), "//[2001:db8::7]", "IPv6 Host");
    strictEqual(URI.serialize({host: "::ffff:129.144.52.38"}), "//[::ffff:129.144.52.38]", "IPv6 Mixed Host");
    strictEqual(URI.serialize({host: "2606:2800:220:1:248:1893:25c8:1946"}), "//[2606:2800:220:1:248:1893:25c8:1946]", "IPv6 Full Host");

    //IPv6address with zone identifier, RFC 6874
    strictEqual(URI.serialize({host: "fe80::a%en1"}), "//[fe80::a%25en1]", "IPv6 Zone Unescaped Host");
    strictEqual(URI.serialize({host: "fe80::a%25en1"}), "//[fe80::a%25en1]", "IPv6 Zone Escaped Host");

    components = {
        scheme: "",
        userinfo: "",
        host: "",
        port: 0,
        path: "",
        query: "",
        fragment: ""
    };
    strictEqual(URI.serialize(components), "//@:0?#", "Empty Components");
});
