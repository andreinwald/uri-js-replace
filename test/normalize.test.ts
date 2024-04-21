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
});
