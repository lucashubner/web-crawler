import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./static_pages/about";
import Sites from "./sites/index";
import SitesView from "./sites/view";
import SiteCrawlView from "./sites/view_crawl";
import Home from "./static_pages/home";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { AppBar, Toolbar, Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<AppBar position="static">
						<Toolbar>
							<Button color="inherit" href="/"> Home </Button>
							<Button color="inherit" href="/about"> About </Button>
							<Button color="inherit" href="/sites"> Sites</Button>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
					<Switch>
						<Route exact path="/"><Home /></Route>
						<Route path="/about"><About /></Route>

						<Route exact path="/sites"><Sites /></Route>
						<Route exact path="/sites/:id" render={(props) => <SitesView {...props} />} />
						<Route exact path="/sites/:site_id/site_crawls/:id" render={(props) => <SiteCrawlView {...props} />} />

					</Switch>
					</Paper>
				</Grid>
			</Grid>
		</div>

	);
}
