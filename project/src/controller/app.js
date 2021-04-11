const crawler = require('./crawler')

const fs = require('fs');


;(async () => {
	console.log("Starting....");
	let rawData = fs.readFileSync('sites.json');
	let sitesObj = JSON.parse(rawData);
	

	var result = [];
	for ( let site in sitesObj.sites ) {
		result.push (crawler.crawl(sitesObj.sites[site]));
	}

	let data = JSON.stringify(result);
	
	await fs.writeFileSync('out/results_'+ Date.now()+'.json', data);

})();
