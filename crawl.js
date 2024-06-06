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
    return absoluteUrls;
}

async function fetchHTML(url) {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors"
    });

    if (response.status >= 400) {
        console.log(`The webpage at ${url} returned an error`)
        return;
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType.split(";").includes("text/html")) {
        console.log(`The webpage at ${url} did not return text or html`)
        return
    }
    return response.text();
    
}

export async function crawlPage(baseUrl, currentUrl=baseUrl, pages={}) {
    const baseDomain = new URL(baseUrl).host;
    const currentDomain = new URL(currentUrl).host;

    if (baseDomain !== currentDomain) return pages;

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (Object.hasOwn(pages, normalizedCurrentUrl)) {
        pages[normalizedCurrentUrl] += 1;
        return pages;
    }
    else {
        pages[normalizedCurrentUrl] = 1;
    }
    try {
        const html = await fetchHTML(currentUrl);
        if (html) {
            const links = getURLsFromHTML(html, baseUrl);
            links.forEach(link => {
                crawlPage(baseUrl, link, pages);
            });

        }
        return pages;

    } catch(err) {
        console.log(err.message);
    }
}