import * as OldURI from "uri-js";
import * as URI from '../src'
import {expect, test} from 'vitest'

function strictEqual(received, expected, comment) {
    expect(received, comment).toStrictEqual(expected);
}


test("URI Parsing", function () {
    let components;
    let uriString;

    uriString = "https://café.com";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    components = URI.parse("café.com");
    strictEqual(components.host, 'xn--caf-dma.com', 'café.com host');

    components = URI.parse("//café.com");
    strictEqual(components.host, 'xn--caf-dma.com', 'café.com host');

    uriString = "uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "?query&params";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = "#/definitions/objectConfig";
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    uriString = '';
    expect(URI.parse(uriString), uriString).toStrictEqual(OldURI.parse(uriString));

    components = URI.parse("#");
    // strictEqual(components.error, undefined, "fragment errors");
    strictEqual(components.scheme, undefined, "scheme");
    //strictEqual(components.authority, undefined, "authority");
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
    //strictEqual(components.authority, undefined, "authority");
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
    //strictEqual(components.authority, undefined, "authority");
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
    //strictEqual(components.authority, undefined, "authority");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, undefined, "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    return;
    // TODO

    //fragment with character tabulation
    components = URI.parse("host#\t");
    console.log(components);
    strictEqual(components.error, undefined, "path errors");
    strictEqual(components.scheme, undefined, "scheme");
    //strictEqual(components.authority, undefined, "authority");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, 'host', "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, "%09", "fragment");

    //IPv4address
    components = URI.parse("//10.10.10.10");
    strictEqual(components.error, undefined, "IPv4address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "10.10.10.10", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");


    //mixed IPv4address & IPv6address
    components = URI.parse("//[::ffff:129.144.52.38]");
    strictEqual(components.error, undefined, "IPv4address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "::ffff:129.144.52.38", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //mixed IPv4address & reg-name, example from terion-name (https://github.com/garycourt/uri-js/issues/4)
    components = URI.parse("uri://10.10.10.10.example.com/en/process");
    strictEqual(components.error, undefined, "mixed errors");
    strictEqual(components.scheme, "uri", "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "10.10.10.10.example.com", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "/en/process", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //IPv6address, example from bkw (https://github.com/garycourt/uri-js/pull/16)
    components = URI.parse("//[2606:2800:220:1:248:1893:25c8:1946]/test");
    strictEqual(components.error, undefined, "IPv6address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "2606:2800:220:1:248:1893:25c8:1946", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "/test", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //IPv6address, example from RFC 5952
    components = URI.parse("//[2001:db8::1]:80");
    strictEqual(components.error, undefined, "IPv6address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "2001:db8::1", "host");
    strictEqual(components.port, 80, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //IPv6address with zone identifier, RFC 6874
    components = URI.parse("//[fe80::a%25en1]");
    strictEqual(components.error, undefined, "IPv4address errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "fe80::a%en1", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");

    //IPv6address with an unescaped interface specifier, example from pekkanikander (https://github.com/garycourt/uri-js/pull/22)
    components = URI.parse("//[2001:db8::7%en0]");
    strictEqual(components.error, undefined, "IPv6address interface errors");
    strictEqual(components.scheme, undefined, "scheme");
    strictEqual(components.userinfo, undefined, "userinfo");
    strictEqual(components.host, "2001:db8::7%en0", "host");
    strictEqual(components.port, undefined, "port");
    strictEqual(components.path, "", "path");
    strictEqual(components.query, undefined, "query");
    strictEqual(components.fragment, undefined, "fragment");
});
