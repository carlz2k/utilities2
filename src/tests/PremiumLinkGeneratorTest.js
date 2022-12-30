import { generate } from "../PremiumLinkGenerator.js";

describe("PremiumLinkGenerator", () => {
    it("create link", async done => {
        jest.useRealTimers();
        jest.setTimeout(30 * 60 * 1000);

        await Promise.all(
            [
                generate("https://rapidgator.net/file/28f564613e1d7b09cbcc28b74922bf66/BOKM2400.mp4.html"),
                generate("https://rapidgator.net/file/ca8e37b698f379e97ad281798b907375/FMLU2847.zip.html")
            ]);
        done();
    });
});
