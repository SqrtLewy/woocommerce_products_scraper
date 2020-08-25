const fs = require('fs');
const Json2csv = require('json2csv').Parser;
const puppeteer = require('puppeteer');

async function scrape(){

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.altersocks.com/products/?product_count=121');

// Gather assets page urls for all the blockchains
const assetUrls = await page.$$eval(
  'li.product-grid-view > div > div > div > h3 > a',
  assetLinks => assetLinks.map(link => link.href)
);

const results = [];

// Visit each assets page one by one
for (let assetsUrl of assetUrls) {
  await page.goto(assetsUrl);
  
    const imgs = await page.$$eval('div.attachment-shop_thumbnail > a > img[src*="/wp-content"]', imgs => imgs.map(img => img.getAttribute('src')));

	const [el2] = await page.$x('/html/body/div[1]/div[2]/main/div/div[1]/section/div[2]/div[2]/div/h1');
	const txt = await el2.getProperty('textContent');
	const title = await txt.jsonValue();
	
	const [el3] = await page.$x('/html/body/div[1]/div[2]/main/div/div[1]/section/div[2]/div[2]/div/div[3]');
	const txt2 = await el3.getProperty('textContent');
	const description = await txt2.jsonValue();

	const [el4] = await page.$x('/html/body/div[1]/div[2]/main/div/div[1]/section/div[2]/div[2]/div/p/span');
	const txt3 = await el4.getProperty('textContent');
	const price = await txt3.jsonValue();

	const [el5] = await page.$x('/html/body/div[1]/div[2]/main/div/div[1]/section/div[2]/div[2]/div/div[4]/span')
	const txt4 = await el5.getProperty('textContent');
	const categories = await txt4.jsonValue();

    results.push([{
		imgs,
		title,
		description,
		price,
		categories
    }]);
  }

	// Writing products data inside a csv file
	const j2csv = new Json2csv;
	const csv = j2csv.parse(results);
	fs.writeFileSync('./products.csv',csv,'utf-8', function (err) {
	if (err) throw err;
		console.log("File saved!");
	})

browser.close();
}

scrape()