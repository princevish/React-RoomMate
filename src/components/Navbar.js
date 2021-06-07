import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,CssBaseline,Toolbar,Typography,IconButton} from '@material-ui/core';
import {Link} from "react-router-dom";
import ForumIcon from '@material-ui/icons/Forum';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1
  },
 
  title: {
    flexGrow: 1,
  },
}));




export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
      <AppBar className={classes.root}>
        <Toolbar>
          
          <Typography   variant="h6" className={classes.title}>
           RoomMate
          </Typography>
          <IconButton  component={Link} to="/chat"
              edge="end"
              aria-label="chat"
             
              aria-haspopup="true"
              
              color="inherit"
            >
              < ForumIcon/>
            </IconButton>
        </Toolbar>
      </AppBar>
</ThemeProvider>
   
  );
}