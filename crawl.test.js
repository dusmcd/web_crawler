import { test, expect } from "@jest/globals";
import { normalizeUrl, getURLsFromHTML } from "./crawl";

test("normalizeUrl function", () => {
    expect(normalizeUrl("http://google.com/")).toBe("google.com");
    expect(normalizeUrl("https://www.google.com/search")).toBe("www.google.com/search");

    expect(normalizeUrl("https://username:password@example.com/")).toBe("username:password@example.com");
    expect(normalizeUrl("https://username:password@example.com/somepath/")).toBe("username:password@example.com/somepath")

    expect(normalizeUrl("http://example.com?search=something")).toBe("example.com?search=something");
    expect(normalizeUrl("http://example.com/listings?search=my_listing")).toBe("example.com/listings?search=my_listing");

    expect(normalizeUrl("http://example.com:74/home")).toBe("example.com:74/home");
    expect(normalizeUrl("https://example.com:55/search?page=here/")).toBe("example.com:55/search?page=here");

    expect(normalizeUrl("https://example.com/home#main")).toBe("example.com/home#main");
    expect(normalizeUrl("https://example.com/home#main/")).toBe("example.com/home#main");
    expect(normalizeUrl("http://example.com/search?page=here#main/")).toBe("example.com/search?page=here#main")
    expect(normalizeUrl("http://example.com/search?page=here#main")).toBe("example.com/search?page=here#main")
});

test("getURLsFromHTML function", () => {
    let expectedValue = ["https://example.com/link"];
    let actualValue = getURLsFromHTML("<!DOCTYPE html><html><body><p>This is a <a href='/link'>Link</a></p></body></html>", "https://example.com");
    for (let i = 0; i < expectedValue.length; i++) {
        expect(expectedValue[i]).toBe(actualValue[i]);
    }
    let html = `
        <html>
            <body>
                <p>
                    Here is a <a href='/link'>Link</a>
                    Here is some more text
                </p>
                <ul>
                    <li>An absolute <a href='https://www.google.com'>link</a></li>
                    <li>Another relative <a href='/something'>link</a></li>
                    <li>Boring text</li>
                </ul>
                <p>
                    A bunch of text. Lorem ipsum
                    Some more really interesting text except this one has a link: <a href='/coolpage'>Cool page</a>
                </p>
            </body>
        </html>
    `
    expectedValue = [
        "http://bootdev.io/link",
        "https://www.google.com/",
        "http://bootdev.io/something",
        "http://bootdev.io/coolpage"
    ];
    actualValue = getURLsFromHTML(html, "http://bootdev.io");
    for (let i = 0; i < expectedValue.length; i++) {
        expect(expectedValue[i]).toBe(actualValue[i])
    }
});