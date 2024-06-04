import { test, expect } from "@jest/globals";
import { normalizeUrl } from "./crawl";

test("normalizes url strings", () => {
    expect(normalizeUrl("http://google.com/")).toBe("google.com");
    expect(normalizeUrl("https://www.google.com/search")).toBe("www.google.com/search");
});

test("parses username and password properly", () => {
    expect(normalizeUrl("https://username:password@example.com/")).toBe("username:password@example.com");
    expect(normalizeUrl("https://username:password@example.com/somepath/")).toBe("username:password@example.com/somepath")
})

test("test query string", () => {
    expect(normalizeUrl("http://example.com?search=something")).toBe("example.com?search=something");
    expect(normalizeUrl("http://example.com/listings?search=my_listing")).toBe("example.com/listings?search=my_listing");
})

test("test ports", () => {
    expect(normalizeUrl("http://example.com:74/home")).toBe("example.com:74/home");
    expect(normalizeUrl("https://example.com:55/search?page=here/")).toBe("example.com:55/search?page=here");
})

test("hashes", () => {
    expect(normalizeUrl("https://example.com/home#main")).toBe("example.com/home#main");
    expect(normalizeUrl("https://example.com/home#main/")).toBe("example.com/home#main");
    expect(normalizeUrl("http://example.com/search?page=here#main/")).toBe("example.com/search?page=here#main")
    expect(normalizeUrl("http://example.com/search?page=here#main")).toBe("example.com/search?page=here#main")
})