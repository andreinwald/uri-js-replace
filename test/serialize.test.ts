import * as URI from '../src'
import * as OldURI from "uri-js";
import {expect, test} from 'vitest'


function strictEqual(received: any, expected: any, comment: any) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Serialization", function () {
    let components: any;

    let uriStrings: string[] = [
        'https://a.b.example.com:80/@user/a/my.img.jpg?q=x&q=#start',
        'uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body',
        'https://café.com/',
        'uri://www.example.org/red%09ros\xE9#red',
        '#/definitions/objectConfig',
        '?query&params',
        './file.html?a=1',
        '//192.68.1.0',
        'ssh://myid@192.168.1.101',
        '192.68.1.0',
        'zoommtg://zoom.us/join?confno=123',
        'admin://etc/default/grub',
        'http://[::1]:8080/x',
        'http://[2001:db8::7]/',
        '',
    ];

    for (let uriString of uriStrings) {
        components = OldURI.parse(uriString);
        expect(URI.serialize(components), `Serializing ` + JSON.stringify(components))
            .toStrictEqual(OldURI.serialize(components));
    }

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

    expect(
        URI.serialize(URI.parse('/rel/path')),
        'parse → serialize round-trip for absolute-relative path',
    ).toStrictEqual(OldURI.serialize(OldURI.parse('/rel/path')));
});

test("absolute paths keep their leading slash", function () {
    for (const components of [
        {path: "/a/../b"},
        {path: "/foo/bar"},
        {path: "/a/_remove_me_host_/b"},
    ]) {
        expect(URI.serialize(components), JSON.stringify(components))
            .toStrictEqual(OldURI.serialize(components));
    }
});

test("scheme and path do not invent a host", function () {
    for (const components of [
        {scheme: "http", path: "/foo"},
        {scheme: "http", path: "foo"},
        {scheme: "http", path: "/a/../b"},
    ]) {
        expect.soft(URI.serialize(components), JSON.stringify(components))
            .toStrictEqual(OldURI.serialize(components));
    }
});

// A relative path can come back as an absolute URL, and a later request follows that host.
test("temporary host marker stays inside a path", function () {
    const components = {path: "https://_remove_me_host_/secret"};
    expect(URI.serialize(components), JSON.stringify(components))
        .toStrictEqual(OldURI.serialize(components));
});
