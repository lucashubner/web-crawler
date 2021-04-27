import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Delete as DeleteIcon , Visibility as  VisibilityIcon } from '@material-ui/icons';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ViewSite = () => {
	const [site, setSite] =  useState([]);
	const [crawls, setCrawls] =  useState([]);
	let { id } = useParams();

	//-----------------------------------------------------------------
	//  Handlers
	//-----------------------------------------------------------------
	function readCrawlHandler(site_id, id){
		axios.get(`http://localhost:3000/api/v1/sites/${site_id}/site_crawls/${id}`)
		.then(res => {
			crawls.push( res.data[0] );
			setCrawls(crawls);
			console.log("pushed");
		})
	};
	//----------------------------------------------------------------
	function deleteCrawlHandler(site_id, id){
		axios.delete(`http://localhost:3000/api/v1/sites/${site_id}/site_crawls/${id}`)
		.then(res => {
			console.log('Deleted Successfully.');
		})
	};
	//----------------------------------------------------------------
	function createCrawlHandler(site_id){
		axios.post(`http://localhost:3000/api/v1/sites/${site_id}/site_crawls/`, {})
		.then(res => {
			console.log('Created!.');
			readCrawlHandler(site_id, res.data.data);
		})
	};
	//-----------------------------------------------------------------
	//  End Handlers
	//-----------------------------------------------------------------

	// DataGrid columns definition
	const columns = [
		{ field: 'id', headerName: 'ID' },				 { field: 'crawl_date', headerName: 'Crawl Date'},
		// { field: 'platform', headerName: ''},   		 { field: 'userAgent', headerName: ''},
		// { field: 'plugins', headerName: ''},		 	 { field: 'mimeTypes', headerName: ''},
		// { field: 'doNotTrack', headerName: ''},			 { field: 'languages', headerName: ''},
		// { field: 'productSub', headerName: ''},			 { field: 'language', headerName: ''},
		// { field: 'vendor', headerName: ''},				 { field: 'oscpu', headerName: ''},
		// { field: 'hardwareConcurrency', headerName: ''}, { field: 'cpuClass', headerName: ''},
		// { field: 'webdriver', headerName: ''},           { field: 'maxTouchPoints', headerName: ''},
		// { field: 'appVersion', headerName: ''},          { field: 'appCodeName', headerName: ''},
		// { field: 'cookieEnabled', headerName: ''},
		{
			field: 'read',
			headerName: <VisibilityIcon />,
			renderCell :  (params) => { return (<a href={"/sites/"+ id + "/site_crawls/" + params.getValue("id")}>{<VisibilityIcon />}</a>) }
		},{
			// Delete button
			field: 'remove',
			headerName: <DeleteIcon />,
			renderCell :  (params) => { return (<a href="#/" onClick={() => {
				// Confirm deletion
				if(window.confirm('Are you sure to delete this record?')){
					deleteCrawlHandler(id, params.getValue("id"))
					const newList = crawls.filter((item) => item.id !== params.getValue("id"));
					setCrawls(newList);
				};
			}}>{<DeleteIcon />}</a>) }
		}
	];
	useEffect(() => {
		// If the id parameter is set, then retrieve the information about the Site, including crawls
		if ( id !== undefined ) {
			axios.get('http://localhost:3000/api/v1/sites/' + id).then((sites) => {
				setSite(sites.data[0]);
				axios.get('http://localhost:3000/api/v1/sites/' + id + '/site_crawls/').then((crawls) => {
					setCrawls(crawls.data);
				});

			});
		} else {
			setSite( [] );
			setCrawls( [] );
		}
	}, [id]);

	return (
		<div>
			<b> Site ID   :</b> {site.id} < br/>
			<b> Site Name :</b> {site.site} <br/>
				<Button onClick={ () => { createCrawlHandler(site.id) }  }> Create New Crawl</Button>
			<div>
				<b> Crawls : </b>
				<div style={{ display: 'flex' , height: '100%',  width: '100%' }}>
					<DataGrid autoHeight rows={crawls} columns={columns} pageSize={10} />
				</div>
			</div>
		</div>
	);
};

export default ViewSite;
