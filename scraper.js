const fs = require('fs');
const Json2csv = require('json2csv').Parser;
const puppeteer = require('puppeteer');

(async () => {
    try {
        // open browser
        let browser = await puppeteer.launch({headless: true});
        // open a new page
        let page = await browser.newPage();
        // enter url
        await page.goto(`url`);
        // a selector that needs to load
        await page.waitForSelector("#content");

        let urls = await page.evaluate(() => {
            // select a selector with links
            let titleNodeList = document.querySelectorAll('li.product-grid-view > div > div > div > h3 > a');
            let titleLinkArray = [];
            for (let i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    // link selection
                    url: titleNodeList[i].getAttribute("href"),
                };
            }
            return titleLinkArray;
        });
        await browser.close();
        // Writing links inside a json file
		const j2csv = new Json2csv;
		const csv = j2csv.parse(urls);
		fs.writeFileSync('./links.csv',csv,'utf-8', function (err) {
            if (err) throw err;
            console.log("File saved!");
        });
        console.log("Browser Closed");
    } catch (err) {
        // Catch and display errors
        console.log((err));
        await browser.close();
        console.log(error("Browser Closed"));
    }
})();