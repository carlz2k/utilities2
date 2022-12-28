import { generate } from "../PremiumLinkGenerator.js";

describe("PremiumLinkGenerator", () => {
    it("create link", async done => {
        jest.useRealTimers();
        jest.setTimeout(30 * 60 * 1000);

        await Promise.all(
            [
                generate("https://rapidgator.net/file/9d7fd851dd2ff4d63193a9041ce3cd86/part186.mp4.html"),
                generate("https://rapidgator.net/file/bf629552a02fe42f63f1b11175761fe5/N_angel314.mp4.html")
            ]);
        done();
    });
});
