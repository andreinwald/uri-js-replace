import * as URI from '../src'
import {expect, test} from 'vitest'
import * as OldURI from "uri-js";

test("URI Normalizing", function () {
    let uriStrings: string[] = [
        'https://a.b.example.com:80/@user/a/my.img.jpg?q=x&q=#start',
        'uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body',
        'https://café.com/asd',
        'uri://www.example.org/red%09ros\xE9#red',
        '#/definitions/objectConfig',
        '?query&params',
        './file.html?a=1',
        '//192.68.1.0',
        'ssh://myid@192.168.1.101',
        '192.68.1.0',
        `urn:some:ip:prop`,
        `urn:example:animal:ferret:nose?name=ferret#foo`,
        `urn:foo:a123,456`,
        `urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6`,
        `urn:uuid:notauuid-7dec-11d0-a765-00a0c91e6bf6`,
        'ws://example.com/foo?bar=baz',
        'ws://example.com/chat',
        'mailto:chris@example.com',
        'mailto:joe@example.com?cc=bob@example.com&body=hello',
        'mailto:list@example.org?In-Reply-To=%3C3469A91.D10AF4C@example.com%3E',
        'mailto:one@example.com,two@example.com?subject=Hey&body=Sign%20me%20up!',
        'zoommtg://zoom.us/join?confno=123',
        'admin://etc/default/grub',
        '',
    ];

    for (let uriString of uriStrings) {
        expect(URI.normalize(uriString), `Normalizing "${uriString}" result`)
            .toStrictEqual(OldURI.normalize(uriString));
    }
});
