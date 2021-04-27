const express = require('express')
const router = express.Router()
const siteController = require('../controller/site.controller');
const siteCrawlController = require('../controller/site_crawl.controller');

router.get   ('/', siteController.findAll);
router.post  ('/', siteController.create);
router.get   ('/:id', siteController.findById);
router.put   ('/:id', siteController.update);
router.delete('/:id', siteController.delete);



// Routes for site_crawl 
router.get   ('/:site_id/site_crawls/',    siteCrawlController.findAll);
router.post  ('/:site_id/site_crawls/',    siteCrawlController.create);
router.get   ('/:site_id/site_crawls/:id', siteCrawlController.findById);
router.put   ('/:site_id/site_crawls/:id', siteCrawlController.update);
router.delete('/:site_id/site_crawls/:id', siteCrawlController.delete);

module.exports = router


