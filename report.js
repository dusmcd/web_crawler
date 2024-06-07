export function printReport(pages) {
    const sortedPages = sortPages(pages);
    console.log("Printing report");
    sortedPages.forEach(page => {
        if (page.value === 1) {
            console.log(`Found ${page.value} internal link to ${page.url}`);
        }
        else {
            console.log(`Found ${page.value} internal links to ${page.url}`);
        }
    });
}

export function sortPages(pages) {
    return Object.keys(pages).map(key => {
        return { url: key, value: pages[key] }
    }).sort((a, b) => b.value - a.value);
}