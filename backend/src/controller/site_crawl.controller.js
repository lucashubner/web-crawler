'use strict';

	const SiteCrawl = require ('../model/site_crawl.model');

	exports.findAll = function (req, res){
		SiteCrawl.findAll( function ( err, site_crawl ) {
			console.log('controller')
			if ( err ) {
				res.send(err);
			}

			console.log('res', site_crawl);

			res.send(site_crawl);
		});	
	};

	exports.create = function ( req, res ) {

		const new_site_crawl = new SiteCrawl(req.body);
		new_site_crawl.site_id = req.params.site_id;

		SiteCrawl.create(new_site_crawl, function ( err, site_crawl ) {
			if ( err ) {
				res.send( err );
			}

			res.json({ message: "SiteCrawl created successfully!", data: site_crawl });
		});
	};

	exports.findById = function ( req, res ) {
		SiteCrawl.findById( req.params.id, function ( err, site_crawl ) {
			if ( err ) {
				res.send( err );
			}
			res.json( site_crawl );
		});
	};

	exports.update = function ( req, res ) {
		if ( req.body.constructor === Object && Object.keys ( req.body ).length === 0 ) {
			res.status(400).send({ error: true, message : 'Please provide all required field' });
		} else {
			SiteCrawl.update( req.params.id, new SiteCrawl ( req.body ), function ( err, employee ) {
				if ( err ) {
					res.send( err );
				}
				res.json({ message : "SiteCrawl successfully updated" });
			});
		}
	};


	exports.delete = function ( req, res ) {
		SiteCrawl.delete ( req.params.id, function ( err, site_crawl ) {
		if ( err ) {
			res.send( err );
		}
		res.json({ message: "SiteCrawl successfully deleted"});
		res.status(200).end();
	});
};
