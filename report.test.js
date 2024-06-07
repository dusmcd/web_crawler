import { sortPages } from "./report.js";
import { test, expect } from "@jest/globals"

const testCases = [
    [{"example.com": 2, "example.com/about": 4, "example.com/tags": 1}, 
    [{url: "example.com/about", value: 4}, {url: "example.com", value: 2}, {url: "example.com/tags", value: 1}]]
];
test("sortPages function", () => {
    testCases.forEach(testCase => {
        const expectedValues = testCase[1];
        const actualValues = sortPages(testCase[0]);
        for (let i = 0; i < expectedValues.length; i++) {
            expect(actualValues[i].value).toBe(expectedValues[i].value);
            expect(actualValues[i].url).toBe(expectedValues[i].url);
        }
    });
});