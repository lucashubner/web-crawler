const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	next();
});

app.use(bodyParser.urlencoded({extended: true }))

app.use(bodyParser.json())

app.get('/', ( req, res ) => {
	res.send("Requests for api should use /api/v1/");
});

const siteRoutes = require('./src/routes/site.routes')

app.use('/api/v1/sites', siteRoutes)



app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})
