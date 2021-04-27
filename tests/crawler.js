const crawler =  (function () {
const puppeteer = require('puppeteer');

const apimonitor = require('./monitorAPIS').apimonitor

	function delay(time) {
	   return new Promise(function(resolve) { 
		   setTimeout(resolve, time)
	   });
	}
	const crawl = async function (site){
		const SiteCrawl = require ('../model/site_crawl.model');
		// Args --no-sandbox --disable-gpu necessary to run on docker environment
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				"--no-sandbox", 
				"--disable-gpu",
			]
		});

		console.log("Oppening page");
		console.log(site);

		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0); 
		await page.evaluateOnNewDocument(apimonitor);

		await page.goto(site);

		console.log("Waiting 5 seconds");
		await delay (5000);

		const monitored = await page.evaluate(() => {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve (navigator.monitorAPI);
				}, 200);
			});
		});

		monitored['site'] = site;

		await console.log(monitored);
		page.close();
		await browser.close();

		return monitored;
	}

	return crawl;
}) ();

module.exports = {
	crawl : crawler
};

