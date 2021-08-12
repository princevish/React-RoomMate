import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../components/inputroom/Roomitem";
import { Grid,Typography } from "@material-ui/core";
import axiosInstance from "../axios";
import { DiamonLoading } from "react-loadingg";
import {Helmet} from "react-helmet";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
    minHeight: "80vh"
  },
  text: {
    justifyContent: "center",
    right: "50%",
  },
}));

export default function Favorite() {
  const [roomstate, setroomState] = useState(false);
  const [load, setLoad] = useState(true);
 
  const Fav = ({ items }) => {
    if(items.length !== 0){
    return items.map((item) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <Item item={item} />
        </Grid>
      );
    });}
  else{
    setLoad(false);
    return (
      <Typography variant="h5"  style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',height:"60vh",margin: "auto"}}>
        Not favorite found
      </Typography>
    );
    }
  };

  useEffect(() => {
    const roomdata = async (setroomState) => {
      try {
        const res = await axiosInstance.get("/api/users/fav");
        const allPosts = await res.data;
        setroomState(allPosts.data.fav);
        if(Boolean(allPosts.data.fav.length)){
        setLoad(false)
        }
       
      } catch (err) {
        console.log(err);
      }
    };
    roomdata(setroomState);
    return () => {
      console.log("unmount");
    };
  }, [load]);
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Favorite in RoomMate For Best Room Rental : RoomMate</title>
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
       {load && <DiamonLoading />}
      <Grid container spacing={2}>
        {roomstate && <Fav items={roomstate} />}
      </Grid>
    </div>
  );
}
