const puppeteer = require('puppeteer');

async function scrapeProduct(url){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	
	const [el] = await page.$x('/html/body/div[8]/div[1]/div[1]/img');
	const src = await el.getProperty('src');
	const image = await src.jsonValue();
	
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
	
	console.log({image, title, description, price, categories});
	
	browser.close();
}

scrapeProduct('url');