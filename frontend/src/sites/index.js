import React, { useState, useEffect  } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Delete as DeleteIcon , Visibility as  VisibilityIcon } from '@material-ui/icons';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Button, Input, InputLabel, FormHelperText  } from '@material-ui/core';

//-----------------------------------------------------------------
//  Handlers
//-----------------------------------------------------------------
function deleteHandler(props){
    axios.delete(`http://localhost:3000/api/v1/sites/${props}`)
    .then(res => {
      console.log('Deleted Successfully.');
    })
  };

function createHandler(props){
    axios.post(`http://localhost:3000/api/v1/sites/`)
    .then(res => {
      console.log('Created Successfully.');
    })
  };


//-----------------------------------------------------------------
// Modal Styles
//-----------------------------------------------------------------

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//-----------------------------------------------------------------
// Main 
//-----------------------------------------------------------------
const Sites = () => {
	const [allSites, setAllSites] =  useState([]);
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

	// Modal
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper} >
			<FormControl>
				<InputLabel htmlFor="my-input"> Site </InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" />
				<FormHelperText id="my-helper-text">Site who will be crawled</FormHelperText>
				<Button onClick={createHandler}>Create</Button>

			</FormControl>
			<Modal />
		</div>
	);
	// End Modal

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'site', headerName: 'site', width : 250 },
		{ 
			field: 'read',
			headerName: 'View',
			renderCell :  (params) => { return (<a href={"/sites/" + params.getValue("id")}>{<VisibilityIcon />}</a>) }
		} , { 
			field: 'remove', 
			headerName: 'Delete', 
			renderCell :  (params) => { return (<a href="#/" onClick={() => {
				if(window.confirm('Are you sure to delete this record?')){
					deleteHandler(params.getValue("id"))
				};
			}}>{<DeleteIcon />}</a>) }
		}
	];



	useEffect(() => {
		axios.get('http://localhost:3000/api/v1/sites/').then((sites) => {
			setAllSites(
				sites.data.map( site => {
					return {
						id     : site.id,
						site   : site.site,
					}
				})
			);
		});
	}, []);

//-----------------------------------------------------------------
// Return
//-----------------------------------------------------------------


	return (
		<div>
			<div>
				<Button onClick={ handleOpen }> Create New Site</Button> <br/>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					>
					{body}
				</Modal>
			</div>
			<div style={{ display: 'flex' , height: '100%',  width: '100%' }} >
				<DataGrid autoHeight rows={allSites} columns={columns} pageSize={allSites.length} />
			</div>
		</div>
	);
};

export default Sites;
