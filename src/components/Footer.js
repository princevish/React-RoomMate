import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {Container,Grid,Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import SubShare from "./Share";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{textAlign:"center"}}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        RoomMate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
 
  footer: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  paper: {
    padding: theme.spacing(2),
   
    color: theme.palette.text.secondary,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} lg={6}>
          
          
            <Typography variant="h6">
              
              RoomMate
            </Typography>
            <Typography variant="body2">
            An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent. Room Rental System application will make easy to find the
location of Rooms/Flats/Houses, select no. of rooms and other
facts by the renter.This application will be able to show 
in a particular area selected by user.</Typography>
          
            
        </Grid>
        
        <Grid item xs={12} sm={4} lg={3}>
        <Typography variant="h6">
              Contect
            </Typography>
            <Typography variant="body2">
              Mobile : +91 9792396458   <br/>    Email: contact@roommate.com  <br/>   Address: Gorakhpur ,Uttar Pradesh ,India    </Typography>
        
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>

        <Typography variant="h6" >
          Followe Us
        </Typography>
         
          <SubShare  url={String(window.location)} title="RoomMate Rentel" />
 
      </Grid>
        <Grid item xs={12}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
        </Grid>
       
      </Grid>
        
      </footer>
    </div>
  );
}