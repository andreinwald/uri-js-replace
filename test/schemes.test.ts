import * as OldURI from "uri-js";
import * as URI from '../src'
import {expect, test} from 'vitest'

test("Other schemes", function () {
    let uriStrings: string[] = [];

    // TODO

    // uriStrings = uriStrings.concat([
    //     `urn:some:ip:prop`,
    //     `urn:example:animal:ferret:nose?name=ferret#foo`,
    //     `urn:foo:a123,456`,
    //     `urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6`,
    //     // `URN:FOO:a123%2c456`,
    //     `urn:uuid:notauuid-7dec-11d0-a765-00a0c91e6bf6`,
    // ]);
    //
    // uriStrings = uriStrings.concat([
    //     'ws://example.com/foo?bar=baz',
    //     'ws://example.com/chat',
    // ]);
    //
    // uriStrings = uriStrings.concat([
    //     'mailto:chris@example.com',
    //     'mailto:joe@example.com?cc=bob@example.com&body=hello',
    //     'mailto:list@example.org?In-Reply-To=%3C3469A91.D10AF4C@example.com%3E',
    // ]);
    //
    // uriStrings = uriStrings.concat([
    //     'zoommtg://zoom.us/join?confno=123',
    //     'admin://etc/default/grub',
    // ]);

    for (let uriString of uriStrings) {
        expect(URI.parse(uriString), `Parsing "${uriString}" result`)
            .toStrictEqual(OldURI.parse(uriString));
        expect(URI.normalize(uriString), `Normalizing "${uriString}" result`)
            .toStrictEqual(OldURI.normalize(uriString));
    }
});
