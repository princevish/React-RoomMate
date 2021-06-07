import React from 'react';
import {
  makeStyles,ThemeProvider
} from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction,CssBaseline,Fab} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";

import Theme from './Theme';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100vw',
    bottom: 0,
    backgroundColor: '#039be5',
    minWidth: '40px',
    zIndex: '10'

  },
  bt: {
    minWidth: '40px',
    marginLeft:"100"
  },
  fabButton: {
    position: 'absolute',
    zIndex: 100,
    top: -28,
    left: 0,
    height:'3rem',
    width:'3rem',
    right: 0,
    margin: '0 auto',
    backgroundColor:"#ff384c"
  }
 
}));

export default function NavBottom() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return ( 
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
    <BottomNavigation value = { value} onChange = {handleChange} className = {classes.root}>
    <BottomNavigationAction component={Link} to="/" label = "Home" style={{color:"#ffff"}}  value = "Home" icon = {< HomeIcon />}/>
    <BottomNavigationAction component={Link} to="/search" label = "Search" style={{color:"#ffff"}} value = "Search" icon = {< SearchIcon />} />
    <Fab color="secondary" aria-label="add" component={Link} to="/sell" className={classes.fabButton}><AddIcon /></Fab>
    <BottomNavigationAction component={Link} to="/favorite" label = "Favorite" style={{color:"#ffff"}} value = "Favorite" icon = {< FavoriteIcon /> }
   />
    <BottomNavigationAction component={Link} to="/profile" label = "Profile" style={{color:"#ffff"}} value = "Profile" icon = {< AccountCircleIcon />}/> 

    </BottomNavigation>
    </ThemeProvider>
  );
}