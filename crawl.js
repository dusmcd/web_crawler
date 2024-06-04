export const normalizeUrl = url => {
    const urlObj = new URL(url);
    let normalizedUrl = "";
    if (urlObj.username) {
            normalizedUrl += `${urlObj.username}:${urlObj.password}@`
    }
    normalizedUrl += `${urlObj.host}${urlObj.pathname}`;
    let lastChar = normalizedUrl.length - 1;
    normalizedUrl = normalizedUrl[lastChar] === "/" ? normalizedUrl.slice(0, lastChar) : normalizedUrl;
    normalizedUrl += `${urlObj.search}${urlObj.hash}`
    lastChar = normalizedUrl.length - 1;
    normalizedUrl = normalizedUrl[lastChar] === "/" ? normalizedUrl.slice(0, lastChar) : normalizedUrl;
    return normalizedUrl;
}