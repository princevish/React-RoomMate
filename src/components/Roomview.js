import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  CardContent,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import WifiIcon from "@material-ui/icons/Wifi";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import { PointSpreadLoading } from "react-loadingg";
const useStyles = makeStyles({
  Box: {
    margin: "auto",
    padding: "30px",
    maxWidth: "1000px",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  image: {
    borderRadius: "50%",
    height: "10rem",
    width: "10rem",
    justifyContent: "center",
    margin: "auto",
  },
  imgroom: {
    borderRadius: "2%",
    maxHeight:"25rem"
  },
  icon: {
    flexGrow: "1",
    display: "flex",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
  },
  details: {
    flexGrow: "1",
    alignContent: "center",
    justifyContent: "space-around",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
});

const roomdata = async (setroomState, params, setNotfound,setLoad) => {
  try {
    const res = await axiosInstance.get(`/api/room/roomview/${params}`);
    const allPosts = await res.data;

    setroomState(allPosts.data);
    setLoad(false);
  } catch (err) {
    if (err.request.status === 404) {
      setNotfound(true);
    }
  }
};

export default function Roomview() {
  const [roomState, setroomState] = useState("");
  const [notfound, setNotfound] = useState(false);
  const [load, setLoad] = useState(true);

  let { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    roomdata(setroomState, id, setNotfound,setLoad);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box className={roomState? classes.Box : ""} maxWidth="xs">
       {load && <PointSpreadLoading />}
      {notfound && <Typography variant="h4">Not Found</Typography>}
      {roomState && (
        <Grid container spacing={3}>
          <Carousel>
            {roomState.images.map((item, i) => (
              <CardMedia key={i}
                component="img"
                alt="room image"
                className={classes.imgroom}
                image={`../${item}`}
              />
            ))}
          </Carousel>

          <Grid container xm={12}>
            <CardContent className={classes.icon}>
              <WifiIcon
                color={roomState.facility.wifi ? "primary" : "disabled"}
              />
              <FastfoodIcon
                color={roomState.facility.food ? "primary" : "disabled"}
              />
              <FlashOnIcon
                color={roomState.facility.electric ? "primary" : "disabled"}
              />
              <LocalDrinkIcon
                color={roomState.facility.water ? "primary" : "disabled"}
              />
            </CardContent>
          </Grid>
          <Grid container xm={12}>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="h6">
                {roomState.details.rooms || 0} Room
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="h6">
                {roomState.details.bathrooms || 0} Bathroom
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="h6">
                {roomState.details.kitchen || 0} Kitchen
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="h6">
                {roomState.details.parking || 0} Parking
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              alt="Profile image"
              className={classes.image}
              image={`../${roomState.users.image}`}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box style={{ margin: "auto", fontSize: "4rem" }}>
              <Typography variant="h6">{roomState.users.name}</Typography>
              <Typography variant="subtitle1">
                {roomState.users.email}
              </Typography>
              <Typography variant="body1">{roomState.users.mobile}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Address</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">{roomState.address.add}, {roomState.address.city},{roomState.address.state}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Description</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">{roomState.description}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} style={{ marginTop: "50px" }}></Grid>
    </Box>
  );
}
