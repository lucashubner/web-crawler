import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ViewSiteCrawl = () => {
	const [crawl, setCrawl] =  useState([]);
	let { id, site_id } = useParams();

		useEffect(() => {
		// If the id parameter is set, then retrieve the information about the Site, including crawls
		if ( id !== undefined ) {
			axios.get('http://localhost:3000/api/v1/sites/' + site_id + '/site_crawls/' + id).then((crawl) => {
				setCrawl(crawl.data[0]);
			});
		} else {
			setCrawl( [] );
		}
	}, [site_id, id]);

	return (
		<div>
			<b> id                   : </b>{crawl.id                 } <br/>
			<b> crawl_date           : </b>{crawl.crawl_date         } <br/>
			<b> platform             : </b>{crawl.platform           } <br/>
			<b> userAgent            : </b>{crawl.userAgent          } <br/>
			<b> plugins              : </b>{crawl.plugins            } <br/>
			<b> mimeTypes            : </b>{crawl.mimeTypes          } <br/>
			<b> doNotTrack           : </b>{crawl.doNotTrack         } <br/>
			<b> languages            : </b>{crawl.languages          } <br/>
			<b> productSub           : </b>{crawl.productSub         } <br/>
			<b> language             : </b>{crawl.language           } <br/>
			<b> vendor               : </b>{crawl.vendor             } <br/>
			<b> oscpu                : </b>{crawl.oscpu              } <br/>
			<b> hardwareConcurrency  : </b>{crawl.hardwareConcurrency} <br/>
			<b> cpuClass             : </b>{crawl.cpuClass           } <br/>
			<b> webdriver            : </b>{crawl.webdriver          } <br/>
			<b> maxTouchPoints       : </b>{crawl.maxTouchPoints     } <br/>
			<b> appVersion           : </b>{crawl.appVersion         } <br/>
			<b> appCodeName          : </b>{crawl.appCodeName        } <br/>
			<b> cookieEnabled        : </b>{crawl.cookieEnabled      } <br/>

		</div>
	);
};

export default ViewSiteCrawl;
