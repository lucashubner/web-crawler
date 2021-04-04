const puppeteer = require('puppeteer');
const apimonitor = require('./monitorAPIS').apimonitor

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}


;(async () => {
	console.log("Starting....");
	const browser = await puppeteer.launch({
		headless: false
	});

	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0); 

	await page.evaluateOnNewDocument(apimonitor);


	console.log("Oppening page");

	// await page.goto('http://google.com/');
	await page.goto('https://amiunique.org/fp/');

	// console.log("Waiting 5 seconds");
	// await delay (5000);

	const monitored = await page.evaluate(() => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve (navigator.monitorAPI);
			}, 200);
		});
	});

	console.log(monitored);

	await browser.close();

})();
