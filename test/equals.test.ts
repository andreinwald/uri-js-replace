import * as URI from '../src'
import {expect, test} from 'vitest'

test("URI Equals", function () {
    expect(URI.equal("example://a/b/c/%7Bfoo%7D", "eXAMPLE://a/./b/../b/c/%7bfoo%7d")).toBeTruthy();
});
