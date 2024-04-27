import * as URI from '../src'
import {expect, test} from 'vitest'
import * as OldURI from "uri-js";

test("URI Normalizing", function () {
    let uriString;

    // uriString = "urn:some:ip:prop";
    // expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "uri://www.example.org/red%09ros\xE9#red";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "?query&params";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "#/definitions/objectConfig";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = '';
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "//192.68.1.0";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));

    uriString = "192.68.1.0";
    expect(URI.normalize(uriString), uriString).toStrictEqual(OldURI.normalize(uriString));


    let uriStrings: string[] = [];

    uriStrings = uriStrings.concat([
        `urn:some:ip:prop`,
        `urn:example:animal:ferret:nose?name=ferret#foo`,
        `urn:foo:a123,456`,
        `urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6`,
        `urn:uuid:notauuid-7dec-11d0-a765-00a0c91e6bf6`,
    ]);

    uriStrings = uriStrings.concat([
        'ws://example.com/foo?bar=baz',
        'ws://example.com/chat',
    ]);

    uriStrings = uriStrings.concat([
        'mailto:chris@example.com',
        'mailto:joe@example.com?cc=bob@example.com&body=hello',
        'mailto:list@example.org?In-Reply-To=%3C3469A91.D10AF4C@example.com%3E',
    ]);

    uriStrings = uriStrings.concat([
        'zoommtg://zoom.us/join?confno=123',
        'admin://etc/default/grub',
    ]);

    for (let uriString of uriStrings) {
        expect(URI.normalize(uriString), `Normalizing "${uriString}" result`)
            .toStrictEqual(OldURI.normalize(uriString));
    }
});
