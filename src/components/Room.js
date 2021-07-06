import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Card,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CardActionArea,
 
} from "@material-ui/core";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FastfoodIcon from "@material-ui/icons/Fastfood";
import WifiIcon from "@material-ui/icons/Wifi";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import axiosInstance from "../axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  card: {
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  share: {
    marginLeft: "auto",
  },
}));


function Item({ item }) {
  const classes = useStyles();
  const [fav, setFav] = useState(false);
  const [uf,setUf]=useState('')

  const favtrue =(id,fs)=>{
        return  fs.includes(id)
  }
  const handleFav = async (id) => {
    console.log(id)
    const like = await axiosInstance.get(`/room/fav/${id}`)
    if(like.status===201){
      setFav(false)
    }else{ 
      setFav(true)
    }
  };
  
  useEffect(() => {
    fetch('/users/list', {
      method: 'GET',
      headers:{
        Accept:"appllication/json",
        "Content-Type":"application/json"
      },credentials:"include"
    }, {})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(data.data?.fav){ setUf(data.data.fav)}
     
    })
  }, [])
useEffect(() => {

  if(favtrue(item._id,uf)){
    setFav(true)
  } 
}, [uf])

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="profile"
            src={"http://127.0.0.1:4000/upload/" + item.users.image}
          ></Avatar>
        }
        action={
          <IconButton aria-label="favorite" onClick={() => handleFav(item._id)}>
            {fav ?<FavoriteIcon  color="secondary" /> :<FavoriteBorderOutlinedIcon color="secondary"/> }
          </IconButton>
        }
        title={item.name}
        subheader={`${item.address.city},${item.address.state}`}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"http://127.0.0.1:4000/" + item.images[0]}
          title="Paella dish"
        />
        <CardContent className={classes.icon}>
          <WifiIcon color={item.facility.wifi ? "primary" : "disabled"} />
          <FastfoodIcon color={item.facility.food ? "primary" : "disabled"} />
          <FlashOnIcon
            color={item.facility.electric ? "primary" : "disabled"}
          />
          <LocalDrinkIcon
            color={item.facility.water ? "primary" : "disabled"}
          />
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Typography variant="h6" component="h6" style={{ marginLeft: "15px" }}>
          {item.price}{" "}
        </Typography>

        <IconButton className={classes.share} aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const roomdata = async (setroomState) => {
  try {
    const res = await axiosInstance.get("/room");
    const allPosts = await res.data;

    setroomState(allPosts.data);
  } catch (err) {
    console.log(err);
  }
};

export default function Room() {
  const [roomState, setroomState] = useState([]);

  useEffect(() => {
    roomdata(setroomState);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {roomState.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Item item={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
