const puppeteer = require('puppeteer');
const apimonitor = require('./monitorAPIS').apimonitor
const fs = require('fs');

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}


;(async () => {
	console.log("Starting....");
	let rawData = fs.readFileSync('sites.json');
	let sitesObj = JSON.parse(rawData);
	
	// Args --no-sandbox --disable-gpu necessary to run on docker environment
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			"--no-sandbox", 
			"--disable-gpu",
		]
	});

	var result = [];
	for ( let site in sitesObj.sites) {
		console.log("Oppening page");
		console.log(sitesObj.sites[site]);

		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0); 
		await page.evaluateOnNewDocument(apimonitor);


		await page.goto(sitesObj.sites[site]);

		// console.log("Waiting 5 seconds");
		// await delay (5000);

		const monitored = await page.evaluate(() => {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve (navigator.monitorAPI);
				}, 200);
			});
		});
		monitored['site'] = sitesObj.sites[site];
		result.push(monitored);
		page.close();
	}

	let data = JSON.stringify(result);
	
	await fs.writeFileSync('out/results_'+ Date.now()+'.json', data);
	await browser.close();

})();
