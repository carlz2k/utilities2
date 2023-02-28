import { generate, launchBrowser } from "../PremiumLinkGenerator.js";

describe("PremiumLinkGenerator", () => {
    const browsers = [];

    afterEach(async () => {
        await Promise.all(browsers.map(async browser => {
            try {
                console.log("browser closed");
                await browser.close();
            } catch (e) {
                console.error(e);
            }
        }));
    });

    it("create link", async done => {
        jest.useRealTimers();
        jest.setTimeout(30 * 60 * 1000);

        const urls = ["https://rapidgator.net/file/f31f8d2d7658d5a724960fae7c3caa9c/angel092.mp4.html",
            "https://rapidgator.net/file/0a48c743540f87721a30323117ab4186/"];
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
