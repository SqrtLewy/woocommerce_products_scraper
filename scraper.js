const fs = require('fs');
const Json2csv = require('json2csv').Parser;
const puppeteer = require('puppeteer');

(async () => {
  try {
    // open browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url
    await page.goto(`url`);
	// a selector that needs to load
    await page.waitForSelector("#content");

    var urls = await page.evaluate(() => {
	  // select a selector with links
      var titleNodeList = document.querySelectorAll('li.product-grid-view > div > div > div > h3 > a');
      var titleLinkArray = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        titleLinkArray[i] = {
		  // link selection
          url: titleNodeList[i].getAttribute("href"),
        };
      }
      return titleLinkArray;
	});
    await browser.close();
    // Writing links inside a json file
    fs.writeFile("urls.json", JSON.stringify(urls), function(err) {
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