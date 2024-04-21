import * as URI from '../src'
import * as OldURI from "uri-js";
import {expect, test} from 'vitest'


function strictEqual(received: any, expected: any, comment: any) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Serialization", function () {
    let components: any;

    components = URI.parse("//e.com/types#/definitions/int");
    expect(URI.serialize(components), JSON.stringify(components)).toStrictEqual(OldURI.serialize(components));

    components = URI.parse("#/definitions/objectConfig");
    expect(URI.serialize(components), JSON.stringify(components)).toStrictEqual(OldURI.serialize(components));

    components = {host: "10.10.10.10.example.com"};
    expect(URI.serialize(components), JSON.stringify(components)).toStrictEqual(OldURI.serialize(components));

    components = {host: "[2001:db8::7]"};
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
});
