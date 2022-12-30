import puppeteer from 'puppeteer';

export const launchBrowser = async () => {
    return await puppeteer.launch({
        headless: true
    });
};

export const generate = async (browser, originalUrl) => {
    const page = await browser.newPage();
    await page.goto('https://www.newscon.net/d/');
    await page.content();
    await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Open the generated snippet")',
    );

    await page.type('.js-predictiveSearchInput', originalUrl);
    const submitButton = await page.$("#btnSubmit");
    await submitButton.click();

    console.log("submit the link " + originalUrl);
    await waitForTextsToAppear(
        page,
        ", the premium link will appear"
    );
    await page.screenshot({path: 'screenshot4.png'});
    console.log("start waiting for link " + originalUrl);
    await waitForTextsToAppear(
        page,
        "The premium link will appear in:",
        10
    );

    await page.screenshot({path: 'screenshot1.png'});

    console.log("start counting down " + originalUrl);
    await waitForTextsToAppear(
        page,
        "copy the download URL inside it",
        20
    );
    await page.screenshot({path: 'screenshot2.png'});

    console.log("premium link ready for " + originalUrl);

    const allHrefs = await retrieveAllHrefs(page);

    allHrefs.filter(href => href.includes("www.pastex.net")).forEach(href => {
        console.log(href);
    });
};

const retrieveAllHrefs = async page => {
    const elementHandles = await page.$$('a');
    const propertyJsHandles = await Promise.all(
        elementHandles.map(handle => handle.getProperty('href'))
    );
    return await Promise.all(
        propertyJsHandles.map(handle => handle.jsonValue())
    );
}

const waitForTextsToAppear = async (page, text, timeoutMinutes = 5) => {
    await page.waitForFunction(
        `document.querySelector("body").innerText.includes("${text}")`,
        {
            timeout: timeoutMinutes * 60 * 1000
        }
    );
}