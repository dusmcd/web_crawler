import { JSDOM } from "jsdom"

export function normalizeUrl(url) {
    const urlObj = new URL(url);
    let normalizedUrl = "";
    if (urlObj.username) {
            normalizedUrl += `${urlObj.username}:${urlObj.password}@`;
    }
    normalizedUrl += `${urlObj.host}${urlObj.pathname}`;
    let lastChar = normalizedUrl.length - 1;
    normalizedUrl = normalizedUrl[lastChar] === "/" ? normalizedUrl.slice(0, lastChar) : normalizedUrl;
    normalizedUrl += `${urlObj.search}${urlObj.hash}`;
    lastChar = normalizedUrl.length - 1;
    normalizedUrl = normalizedUrl[lastChar] === "/" ? normalizedUrl.slice(0, lastChar) : normalizedUrl;
    return normalizedUrl;
}

export function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll("a");
    const absoluteUrls = []
    links.forEach(link => {
        if (URL.canParse(link.href)) {
            absoluteUrls.push(link.href);
        } else {
            absoluteUrls.push(`${baseURL}${link.href}`)
        }
    });
    console.log(absoluteUrls);
    return absoluteUrls;
}