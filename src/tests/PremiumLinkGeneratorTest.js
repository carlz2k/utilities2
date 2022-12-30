import { generate, launchBrowser } from "../PremiumLinkGenerator.js";

describe("PremiumLinkGenerator", () => {
    const browsers = [];

    afterEach(() => {
        browsers.forEach(async browser => {
            try {
                console.log("browser closed");
                await browser.close();
            } catch (e) {
                console.error(e);
            }
        });
    });

    it("create link", async done => {
        jest.useRealTimers();
        jest.setTimeout(30 * 60 * 1000);

        const urls = ["https://rapidgator.net/file/2bb9cbf0fa09d3701273f7c75ffee4f7/Sk-WCocft.mp4.html",
            "https://rapidgator.net/file/4213f6c43ae433e2494ef7410fffeda4/1935656344ebc338611.zip.html"];

        await Promise.all(urls.map(async () => {
            const browser = await launchBrowser();
            browsers.push(browser);
        }))

        const promises = browsers.map(async (browser, index) =>
            await generate(browser, urls[index])
        );

        await Promise.all(promises);

        done();
    });
});
