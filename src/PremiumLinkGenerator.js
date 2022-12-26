import puppeteer from 'puppeteer';

export const generate = async originalUrl => {
    const browser = await puppeteer.launch({
        headless: true
    });
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
    await page.waitForFunction(
        'document.querySelector("body").innerText.includes(", the premium link will appear")',
        {
            timeout: 5 * 60 * 1000
        }
    );
    await page.screenshot({path: 'screenshot4.png'});
    console.log("start waiting for link " + originalUrl);
    await page.waitForFunction(
        'document.querySelector("body").innerText.includes("The premium link will appear in:")',
        {
            timeout: 5 * 60 * 1000
        }
    );

    await page.screenshot({path: 'screenshot1.png'});

    console.log("start counting down " + originalUrl);
    await page.waitForFunction(
        'document.querySelector("body").innerText.includes("copy the download URL inside it")',
        {
            timeout: 15 * 60 * 1000
        }
    );
    await page.screenshot({path: 'screenshot2.png'});

    console.log("premium link ready for " + originalUrl);

    const allHrefs = await retrieveAllHrefs(page);

    allHrefs.filter(href=>href.includes("www.pastex.net")).forEach(href => {
        console.log(href);
    });

    await browser.close();
};

const retrieveAllHrefs = async page => {
    const elementHandles = await page.$$('a');
    const propertyJsHandles = await Promise.all(
        elementHandles.map(handle => handle.getProperty('href'))
    );
    return  await Promise.all(
        propertyJsHandles.map(handle => handle.jsonValue())
    );
}