import * as URI from '../src'
import {expect, test} from 'vitest'

function strictEqual(received, expected, comment) {
    expect(received, comment).toStrictEqual(expected);
}

test("URI Resolving", function () {
    //normal examples from RFC 3986
    const base = "uri://a/b/c/d;p?q";

    strictEqual(URI.resolve(base, "//g"), "uri://g", "//g");

    return; // TODO

    strictEqual(URI.resolve(base, "g:h"), "g:h", "g:h");
    strictEqual(URI.resolve(base, "g:h"), "g:h", "g:h");
    strictEqual(URI.resolve(base, "g"), "uri://a/b/c/g", "g");
    strictEqual(URI.resolve(base, "./g"), "uri://a/b/c/g", "./g");
    strictEqual(URI.resolve(base, "g/"), "uri://a/b/c/g/", "g/");
    strictEqual(URI.resolve(base, "/g"), "uri://a/g", "/g");
    strictEqual(URI.resolve(base, "?y"), "uri://a/b/c/d;p?y", "?y");
    strictEqual(URI.resolve(base, "g?y"), "uri://a/b/c/g?y", "g?y");
    strictEqual(URI.resolve(base, "#s"), "uri://a/b/c/d;p?q#s", "#s");
    strictEqual(URI.resolve(base, "g#s"), "uri://a/b/c/g#s", "g#s");
    strictEqual(URI.resolve(base, "g?y#s"), "uri://a/b/c/g?y#s", "g?y#s");
    strictEqual(URI.resolve(base, ";x"), "uri://a/b/c/;x", ";x");
    strictEqual(URI.resolve(base, "g;x"), "uri://a/b/c/g;x", "g;x");
    strictEqual(URI.resolve(base, "g;x?y#s"), "uri://a/b/c/g;x?y#s", "g;x?y#s");
    strictEqual(URI.resolve(base, ""), "uri://a/b/c/d;p?q", "");
    strictEqual(URI.resolve(base, "."), "uri://a/b/c/", ".");
    strictEqual(URI.resolve(base, "./"), "uri://a/b/c/", "./");
    strictEqual(URI.resolve(base, ".."), "uri://a/b/", "..");
    strictEqual(URI.resolve(base, "../"), "uri://a/b/", "../");
    strictEqual(URI.resolve(base, "../g"), "uri://a/b/g", "../g");
    strictEqual(URI.resolve(base, "../.."), "uri://a/", "../..");
    strictEqual(URI.resolve(base, "../../"), "uri://a/", "../../");
    strictEqual(URI.resolve(base, "../../g"), "uri://a/g", "../../g");

    //abnormal examples from RFC 3986
    strictEqual(URI.resolve(base, "../../../g"), "uri://a/g", "../../../g");
    strictEqual(URI.resolve(base, "../../../../g"), "uri://a/g", "../../../../g");

    strictEqual(URI.resolve(base, "/./g"), "uri://a/g", "/./g");
    strictEqual(URI.resolve(base, "/../g"), "uri://a/g", "/../g");
    strictEqual(URI.resolve(base, "g."), "uri://a/b/c/g.", "g.");
    strictEqual(URI.resolve(base, ".g"), "uri://a/b/c/.g", ".g");
    strictEqual(URI.resolve(base, "g.."), "uri://a/b/c/g..", "g..");
    strictEqual(URI.resolve(base, "..g"), "uri://a/b/c/..g", "..g");

    strictEqual(URI.resolve(base, "./../g"), "uri://a/b/g", "./../g");
    strictEqual(URI.resolve(base, "./g/."), "uri://a/b/c/g/", "./g/.");
    strictEqual(URI.resolve(base, "g/./h"), "uri://a/b/c/g/h", "g/./h");
    strictEqual(URI.resolve(base, "g/../h"), "uri://a/b/c/h", "g/../h");
    strictEqual(URI.resolve(base, "g;x=1/./y"), "uri://a/b/c/g;x=1/y", "g;x=1/./y");
    strictEqual(URI.resolve(base, "g;x=1/../y"), "uri://a/b/c/y", "g;x=1/../y");

    strictEqual(URI.resolve(base, "g?y/./x"), "uri://a/b/c/g?y/./x", "g?y/./x");
    strictEqual(URI.resolve(base, "g?y/../x"), "uri://a/b/c/g?y/../x", "g?y/../x");
    strictEqual(URI.resolve(base, "g#s/./x"), "uri://a/b/c/g#s/./x", "g#s/./x");
    strictEqual(URI.resolve(base, "g#s/../x"), "uri://a/b/c/g#s/../x", "g#s/../x");

    strictEqual(URI.resolve(base, "uri:g"), "uri:g", "uri:g");

    //examples by PAEz
    strictEqual(URI.resolve("//www.g.com/", "/adf\ngf"), "//www.g.com/adf%0Agf", "/adf\\ngf");
    strictEqual(URI.resolve("//www.g.com/error\n/bleh/bleh", ".."), "//www.g.com/error%0A/", "//www.g.com/error\\n/bleh/bleh");
});
