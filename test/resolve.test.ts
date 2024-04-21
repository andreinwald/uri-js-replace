import * as URI from '../src'
import {expect, test} from 'vitest'

function strictEqual(received: any, expected: any, comment: any) {
    expect(received, comment).toStrictEqual(expected);
}


test("URI Resolving", function () {
    // normal examples from RFC 3986
    const base = 'uri://a/b/c/d;p?q'
    strictEqual(URI.resolve(base, 'g'), 'uri://a/b/c/g', 'g')
    strictEqual(URI.resolve(base, './g'), 'uri://a/b/c/g', './g')
    strictEqual(URI.resolve(base, 'g/'), 'uri://a/b/c/g/', 'g/')
    strictEqual(URI.resolve(base, '/g'), 'uri://a/g', '/g')
    strictEqual(URI.resolve(base, '//g'), 'uri://g', '//g')
    strictEqual(URI.resolve(base, '?y'), 'uri://a/b/c/d;p?y', '?y')
    strictEqual(URI.resolve(base, 'g?y'), 'uri://a/b/c/g?y', 'g?y')
    strictEqual(URI.resolve(base, '#s'), 'uri://a/b/c/d;p?q#s', '#s')
    strictEqual(URI.resolve(base, 'g#s'), 'uri://a/b/c/g#s', 'g#s')
    strictEqual(URI.resolve(base, 'g?y#s'), 'uri://a/b/c/g?y#s', 'g?y#s')
    strictEqual(URI.resolve(base, ';x'), 'uri://a/b/c/;x', ';x')
    strictEqual(URI.resolve(base, 'g;x'), 'uri://a/b/c/g;x', 'g;x')
    strictEqual(URI.resolve(base, 'g;x?y#s'), 'uri://a/b/c/g;x?y#s', 'g;x?y#s')
    strictEqual(URI.resolve(base, ''), 'uri://a/b/c/d;p?q', '')
});
