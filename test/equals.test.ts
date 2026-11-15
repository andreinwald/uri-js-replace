import * as URI from '../src'
import * as OldURI from "uri-js";
import {expect, test} from 'vitest'

test("URI Equals", function () {
    expect(URI.equal("example://a/b/c/%7Bfoo%7D", "eXAMPLE://a/./b/../b/c/%7bfoo%7d")).toBeTruthy();
    expect(URI.equal("http://[::1]:8080/a", "http://[::2]:9090/b")).toBeFalsy();

    // Path, query, and fragment are case-sensitive. Scheme case is not.
    const pairs = [
        ["http://example.com/A", "http://example.com/a"],
        ["http://example.com/?A=B", "http://example.com/?a=b"],
        ["http://example.com/#Foo", "http://example.com/#foo"],
        ["HTTP://Example.com/Foo", "http://example.com/Foo"],
    ];
    for (const [left, right] of pairs) {
        expect.soft(URI.equal(left, right), `${left} vs ${right}`).toBe(OldURI.equal(left, right));
    }
});
