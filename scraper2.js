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

        let products = await page.evaluate(() => {
            // select a selector with links to photos
            let getimages = document.querySelectorAll('div.attachment-shop_thumbnail > a > img[src*="/wp-content"]');
            // select only links
            let images = [].map.call(getimages, img => img.src);
            let title = document.querySelector('h1.product_title').textContent;
            let description = document.querySelector('.post-content').textContent;
            let price = document.querySelector('p.price > span:nth-child(1)').textContent;
            let categories = document.querySelector('.posted_in').textContent;
            let productsArray = [];
            for (let i = 0; i < 160; i++) {
                productsArray[i] = {
                    images: images,
                    title: title,
                    descrption: description,
                    price: price,
                    categories: categories
                };
            }
            return productsArray;
        });
        await browser.close();
        // Writing links inside a json file
		const j2csv = new Json2csv;
		const csv = j2csv.parse(products);
		fs.writeFileSync('./products.csv',csv,'utf-8', function (err) {
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