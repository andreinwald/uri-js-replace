import * as URI from '../src'
import {expect, test} from 'vitest'

function strictEqual(received, expected, comment?) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Normalizing", function () {
    //test from RFC 3987
    strictEqual(URI.normalize("uri://www.example.org/red%09ros\xE9#red"), "uri://www.example.org/red%09ros%c3%a9#red");

    //IPv4address
    strictEqual(URI.normalize("//192.68.1.0"), "//192.68.1.0");

    return;
    // TODO


    strictEqual(URI.normalize("//[2001:0db8::0001]/"), "//[2001:db8::1]/");

    //IPv6address, example from RFC 3513
    strictEqual(URI.normalize("http://[1080::8:800:200C:417A]/"), "http://[1080::8:800:200c:417a]/");

    //IPv6address, examples from RFC 5952
    strictEqual(URI.normalize("//[2001:0db8::0001]/"), "//[2001:db8::1]/");
    strictEqual(URI.normalize("//[2001:db8::1:0000:1]/"), "//[2001:db8::1:0:1]/");
    strictEqual(URI.normalize("//[2001:db8:0:0:0:0:2:1]/"), "//[2001:db8::2:1]/");
    strictEqual(URI.normalize("//[2001:db8:0:1:1:1:1:1]/"), "//[2001:db8:0:1:1:1:1:1]/");
    strictEqual(URI.normalize("//[2001:0:0:1:0:0:0:1]/"), "//[2001:0:0:1::1]/");
    strictEqual(URI.normalize("//[2001:db8:0:0:1:0:0:1]/"), "//[2001:db8::1:0:0:1]/");
    strictEqual(URI.normalize("//[2001:DB8::1]/"), "//[2001:db8::1]/");
    strictEqual(URI.normalize("//[0:0:0:0:0:ffff:192.0.2.1]/"), "//[::ffff:192.0.2.1]/");

    //Mixed IPv4 and IPv6 address
    strictEqual(URI.normalize("//[1:2:3:4:5:6:192.0.2.1]/"), "//[1:2:3:4:5:6:192.0.2.1]/");
    strictEqual(URI.normalize("//[1:2:3:4:5:6:192.068.001.000]/"), "//[1:2:3:4:5:6:192.68.1.0]/");
});
