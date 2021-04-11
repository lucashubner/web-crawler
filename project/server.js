const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

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
