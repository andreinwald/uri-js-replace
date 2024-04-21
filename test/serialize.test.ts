import * as URI from '../src'
import * as OldURI from "uri-js";
import {expect, test} from 'vitest'
import {URIComponents} from '../src'

function strictEqual(received, expected, comment) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Serialization", function () {
    let components: URIComponents;

    components = URI.parse("#/definitions/objectConfig");
    expect(URI.serialize(components), JSON.stringify(components)).toStrictEqual(OldURI.serialize(components));

    components = {
        scheme: "uri",
        userinfo: "foo:bar",
        host: "example.com",
        port: 1,
        path: "path",
        query: "query",
        fragment: "fragment"
    };
    expect(URI.serialize(components), JSON.stringify(components)).toStrictEqual(OldURI.serialize(components));

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

    components = {};
    strictEqual(URI.serialize(components), "", "Undefined Components");

    components = {
        scheme: "uri",
        host: "example.com",
        port: "9000",
    };
    strictEqual(URI.serialize(components), "uri://example.com:9000", "String port");

    strictEqual(URI.serialize({host: "10.10.10.10.example.com"}), "10.10.10.10.example.com", "Mixed IPv4address & reg-name");

    strictEqual(URI.serialize({host: "[2001:db8::7]"}), "[2001:db8::7]", "IPv6 Host");
    strictEqual(URI.serialize({host: "[2606:2800:220:1:248:1893:25c8:1946]"}), "[2606:2800:220:1:248:1893:25c8:1946]", "IPv6 Full Host");
});
