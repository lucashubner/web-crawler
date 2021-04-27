'use strict';

const mysql = require('mysql2');

const dbConn = mysql.createConnection({
	host     : 'localhost',
	port     : '6603',
	user     : 'root',
	password : '123456',
	database : 'site_crawler'
});

dbConn.connect( function (err) {
	if (err) throw err;
	console.log ("Database Connected");
});

module.exports = dbConn;
