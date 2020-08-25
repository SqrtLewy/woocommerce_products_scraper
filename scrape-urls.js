const fs = require('fs');
const Json2csv = require('json2csv').Parser;
const puppeteer = require('puppeteer');

(async () => {
    try {
        // open browser
        var browser = await puppeteer.launch({headless: true});
        // open a new page
        var page = await browser.newPage();
        // enter url
		await page.setDefaultNavigationTimeout(0); 
        await page.goto(`https://www.altersocks.com/products/?product_count=121`);
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
 
	titleLinkArray.forEach((item) => {
    (async () => {
    try {
        // open browser
        var browser = await puppeteer.launch({headless: true});
        // open a new page
        var page = await browser.newPage();
        // enter url
        await page.goto(item);
        // a selector that needs to load
        await page.waitForSelector("#content");
 
        var products = await page.evaluate(() => {
            // select a selector with links to photos
            var getimages = document.querySelectorAll('div.attachment-shop_thumbnail > a > img[src*="/wp-content"]');
            // select only links
            var images = [].map.call(getimages, img => img.src);
            var title = document.querySelector('h1.product_title').textContent;
            var description = document.querySelector('.post-content').textContent;
            var price = document.querySelector('p.price > span:nth-child(1)').textContent;
            var categories = document.querySelector('.posted_in').textContent;
            var productsArray = [];
            for (var i = 0; i < 160; i++) {
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
})