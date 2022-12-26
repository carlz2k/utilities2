import { generate } from "../PremiumLinkGenerator.js";

describe("PremiumLinkGenerator", () => {
    it("create link", async done => {
        jest.useRealTimers();
        jest.setTimeout(30 * 60 * 1000);

        await Promise.all(
            [
                generate("https://rapidgator.net/file/f49c3e5c2ff2a9c3cce0ed2d56824219/849612.zip.html"),
                generate("https://rapidgator.net/file/6209ffcfd5e62b0c0b040874f5789c24/angel051_FHD.mp4.html")
            ]);
        done();
    });
});
