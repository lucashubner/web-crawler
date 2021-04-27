'use strict';

const Site = require ('../model/site.model');

exports.findAll = function (req, res){
	Site.findAll( function ( err, site ) {
		console.log('controller')
		if ( err ) {
			res.send(err);
		}

		console.log('res', site);

		res.send(site);
	});	
};

exports.create = function ( req, res ) {

	const new_site = new Site(req.body);

	// Handle Null
	if ( req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
		res.status(400).send({ error: true, message: 'Please provide all required field' });
	} else { 
		Site.create(new_site, function ( err, site ) {
			if ( err ) {
				res.send(err);
			}

			res.json({ message: "Site created successfully!", data: site });
		});
	}
};

exports.findById = function ( req, res ) {
	Site.findById( req.params.id, function ( err, site ) {
		if ( err ) {
			res.send( err );
		}
		res.json( site );
	});
};

exports.update = function ( req, res ) {
	if ( req.body.constructor === Object && Object.keys ( req.body ).length === 0 ) {
		res.status(400).send({ error: true, message : 'Please provide all required field' });
	} else {
		Site.update( req.params.id, new Site ( req.body ), function ( err, employee ) {
			if ( err ) {
				res.send( err );
			}
			res.json({ message : "Site successfully updated" });
		});
	}
};


exports.delete = function ( req, res ) {
	Site.delete ( req.params.id, function ( err, site ) {
		if ( err ) {
			res.send( err );
		}
		res.json({ message: "Site successfully deleted"});
	});
};
