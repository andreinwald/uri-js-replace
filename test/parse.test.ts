import * as OldURI from "uri-js";
import * as URI from '../src'
import {expect, test} from 'vitest'

function strictEqual(received:any, expected:any, comment:any) {
    expect(received, comment).toStrictEqual(expected);
}


test("URI Parsing", function () {
    let components;
    let uriString;

    uriString = "https://café.com";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "meta/core#/$defs/anchorString";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "buu.json#/definitions/buu";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "name.json#/definitions/orNull";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "?query&params";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "#/definitions/objectConfig";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = '';
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    components = URI.parse("#");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, undefined, "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, "", "fragment");


    //all
    components = URI.parse("uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body");
    strictEqual(components.error, undefined, "all errors");
    strictEqual(components.scheme, "uri", "scheme");
    strictEqual(components.userinfo, "user:pass", "userinfo");
    strictEqual(components.host, "example.com", "host");
    strictEqual(components.port, 123, "port");
    strictEqual(components.path, "/one/two.three", "path");
    strictEqual(components.query, "q1=a1&q2=a2", "query");
    strictEqual(components.fragment, "body", "fragment");


    //IPv4address
    components = URI.parse("http://10.10.10.10");
    strictEqual(components.error, undefined, "IPv4address errors");
    strictEqual(components.scheme, 'http', "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "10.10.10.10", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //IPv6address
    components = URI.parse("//[2001:db8::7]");
    strictEqual(components.error, undefined, "IPv4address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "2001:db8::7", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //scheme
    components = URI.parse("uri:");
    strictEqual(components.error, undefined, "scheme errors");
    strictEqual(components.scheme, "uri", "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, undefined, "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //path
    components = URI.parse("");
    strictEqual(components.error, undefined, "path errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, undefined, "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //query
    components = URI.parse("?");
    strictEqual(components.error, undefined, "query errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, undefined, "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");
});
