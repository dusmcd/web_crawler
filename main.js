import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
    try {
        if (process.argv.length === 3) {
            const url = process.argv[2];
            console.log(`Crawling at ${url}`)
            const pages = await crawlPage(url);
            printReport(pages); 
        }
        else if (process.argv.length > 3) {
            throw new Error("Too many arguments. You can only supply one url");
        }
        else {
            throw new Error("Not enough arguments. Please supply a base url");
        }
    } catch(err) {
        console.log(err.message);
    }
}

main()