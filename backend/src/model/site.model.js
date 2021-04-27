'use strict';

var dbConn = require('./../../config/db.config');

var Site = function(site) {
	this.id = site.id;
	this.site = site.site;
	this.created_at = new Date();
	this.updated_at = new Date(); 

};

Site.create = function ( newSite, result ) {
	dbConn.query("INSERT INTO site set ?", newSite, function ( err, res ) {
		if( err ) {
			console.log("error: ", err);
			result(err, null);
		} else {
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};

Site.findById = function ( id, result ) {
	dbConn.query("SELECT * FROM site where id = ?", id, function ( err, res) {
		if ( err ) {
			console.log("error: ", err); 
			result( err, null);
		} else { 
			result ( null, res );
		}
	});

};

Site.findAll = function ( result ) {
	dbConn.query("SELECT * FROM site", function ( err, res ) {
		if ( err ) {
			console.log("error: ", err);
			result ( null, err );
		} else { 
			console.log("Sites : ", res );
			result( null, res);
		}
	});

};

Site.update = function ( id, site, result ) {
	dbConn.query("UPDATE site SET site = ? where id = ?", [site.site, id], function ( err, res ){
		if ( err ) {
			console.log("Error: ", err);
			result( null, err );
		} else {
			result ( null, res );
		}
	});

};


Site.delete = function ( id, result ) {
	dbConn.query ("DELETE FROM site WHERE id = ?", id, function ( err, res ) {
		if ( err ) {
			console.log( "error: ", err );
			result( null, err );
		} else { 
			result( null, res );
		}
	});
};

module.exports = Site;

