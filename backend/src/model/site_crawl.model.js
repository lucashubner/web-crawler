'use strict';

const dbConn = require('./../../config/db.config');
const crawler = require('../controller/crawler');
const siteModel = require('./site.model');


var SiteCrawl = function(site_crawl) {
	this.id = site_crawl.id;
	this.site_id = site_crawl.site_id;

	this.crawl_date            = new Date();
	this.platform              = site_crawl.platform;
	this.userAgent             = site_crawl.userAgent;
	this.plugins               = site_crawl.plugins;
	this.mimeTypes             = site_crawl.mimeTypes;
	this.doNotTrack            = site_crawl.doNotTrack;
	this.languages             = site_crawl.languages;
	this.productSub            = site_crawl.productSub;
	this.language              = site_crawl.language;
	this.vendor                = site_crawl.vendor;
	this.oscpu                 = site_crawl.oscpu;
	this.hardwareConcurrency   = site_crawl.hardwareConcurrency;
	this.cpuClass              = site_crawl.cpuClass;
	this.webdriver             = site_crawl.webdriver;
	this.maxTouchPoints        = site_crawl.maxTouchPoints;
	this.appVersion            = site_crawl.appVersion;
	this.appCodeName           = site_crawl.appCodeName;
	this.cookieEnabled         = site_crawl.cookieEnabled;

	this.ready = false;

	this.created_at = new Date();
	this.updated_at = new Date(); 

};

SiteCrawl.create = function ( newSiteCrawl, result ) {
	dbConn.query("INSERT INTO site_crawl set ?", newSiteCrawl, function ( err, res ) {
		if( err ) {
			console.log("error: ", err);
			result( err, null );
		} else {
			siteModel.findById(newSiteCrawl.site_id, function ( err, site ){
				if ( err ) {
					result( err, null );
				} else {
					site = site[0].site;
					// Async function
					crawler.crawl(site, res.insertId);
				}
			});
			result( null , res.insertId );
		}
	});
};

SiteCrawl.findById = function ( id, result ) {
	dbConn.query("SELECT * FROM site_crawl where id = ?", id, function ( err, res) {
		if ( err ) {
			console.log("error: ", err); 
			result( err, null);
		} else { 
			result ( null, res );
		}
	});

};

SiteCrawl.findAll = function ( result ) {
	dbConn.query("SELECT * FROM site_crawl", function ( err, res ) {
		if ( err ) {
			console.log("error: ", err);
			result ( null, err );
		} else { 
			console.log("SiteCrawls : ", res );
			result( null, res);
		}
	});

};

SiteCrawl.update = function ( id, site_crawl, result ) {
	dbConn.query("UPDATE site_crawl " +
					"SET platform = ?, userAgent =?, plugins=?, mimeTypes=?,"+
					"doNotTrack=?, languages=?, productSub=?, language=?, "+
					"vendor=?, oscpu=?, hardwareConcurrency=?, cpuClass=?, "+
					"webdriver=?, maxTouchPoints=?, appVersion=?, appCodeName=?,"+
					"cookieEnabled=?, ready=? where  id = ?",
		[
			site_crawl.platform,
			site_crawl.userAgent,
			site_crawl.plugins,
			site_crawl.mimeTypes,
			site_crawl.doNotTrack,
			site_crawl.languages,
			site_crawl.productSub,
			site_crawl.language,
			site_crawl.vendor,
			site_crawl.oscpu,
			site_crawl.hardwareConcurrency,
			site_crawl.cpuClass,
			site_crawl.webdriver,
			site_crawl.maxTouchPoints,
			site_crawl.appVersion,
			site_crawl.appCodeName,
			site_crawl.cookieEnabled,
			site_crawl.ready,
			id
		],
		function ( err, res ){
			if ( err ) {
				console.log("Error: ", err);
				result( null, err );
			} else {
				result ( null, res );
			}
		});

};


SiteCrawl.delete = function ( id, result ) {
	dbConn.query ("DELETE FROM site_crawl WHERE id = ?", id, function ( err, res ) {
		if ( err ) {
			console.log( "error: ", err );
			result( null, err );
		} else { 
			result( null, res );
		}
	});
};

module.exports = SiteCrawl;

