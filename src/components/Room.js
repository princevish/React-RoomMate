import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent 
  , CardMedia,Grid,
  Paper,
  CardActions,
  Card,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CssBaseline,
  CardActionArea,

} from '@material-ui/core';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import WifiIcon from '@material-ui/icons/Wifi';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'2rem',
   
  },
  icon:{
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'space-around'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  share: {
    marginLeft: 'auto',
  },
}));


function Item(){
  const classes = useStyles();

  return (
 
    <Card >
      <CardHeader
        avatar={
          <Avatar aria-label="profile" bgcolor="secondary">
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="favorite">
            <FavoriteIcon color="secondary"/>
          </IconButton>
        }
        title="Prince Hostel"
        subheader="Bank Road, Gorakhpur"
       
      />
      <CardActionArea>
      <CardMedia
        className = {classes.media}
        image="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        title="Paella dish"
      />
      <CardContent className={classes.icon}>
          <WifiIcon color="primary" />
          <FastfoodIcon color="primary"  />
          <FlashOnIcon  color="primary" />
          <LocalDrinkIcon  color="primary" />
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
     
      <Typography variant="h6"  component="h6" > 
      &#8377; 2500   

        </Typography>
  
        <IconButton
          className={classes.share}
          aria-label="share"
        >
           <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>

  );
}
export default function Room() {
  
  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
    <div className={classes.root}>
      <Grid container spacing={2}>
      
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}><Item/></Paper>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  );
}
