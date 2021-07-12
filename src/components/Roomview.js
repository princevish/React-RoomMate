import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
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
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
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
    height: "6rem",
    width: "6rem",
    justifyContent: "center",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      borderRadius: "50%",
      height: "10rem",
      width: "10rem",
      justifyContent: "center",
      margin: "auto",
    },
  },
  imgroom: {
    borderRadius: "2%",
    maxHeight: "25rem",
  },
  icon: {
    flexGrow: "1",
    display: "flex",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
  },
  detail: {
    display: "flex",
    backgroundColor: "#2196f3",
    color: "white",
    alignContent: "center",
    justifyContent: "space-around",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    marginBottom: "1rem",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const roomdata = async (setroomState, params, setLoad, push) => {
  try {
    const res = await axiosInstance.get(`/api/room/roomview/${params}`);
    const allPosts = await res.data;

    setroomState(allPosts.data);
    setLoad(false);
  } catch (err) {
    if (err.request.status === 404) {
      push("/notfound");
    }
  }
};

export default function Roomview() {
  const [roomState, setroomState] = useState("");

  const [load, setLoad] = useState(true);
  const { push } = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    roomdata(setroomState, id, setLoad, push);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const simulateCall = () =>
    window.open(`tel:${roomState.users.mobile}`, "_self");
  return (
    <Box className={roomState ? classes.Box : ""} maxWidth="xs">
      {load && <PointSpreadLoading />}
      {roomState && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">{roomState.name}</Typography>
          </Grid>
          <Carousel>
            {roomState.images.map((item, i) => (
              <CardMedia
                key={i}
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
              <Typography variant="subtitle1">
                {roomState.details.rooms || 0} Room
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.bathrooms || 0} Bathroom
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.kitchen || 0} Kitchen
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
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
            <Box className={classes.info}>
              <Typography variant="h6">{roomState.users.name}</Typography>
              <Typography variant="subtitle1">
                {roomState.users.email}
              </Typography>
              <Typography variant="body1">{roomState.users.mobile}</Typography>
              <Button
                variant="outlined"
                style={{ marginTop: "10px" }}
                color="primary"
                onClick={simulateCall}
              >
                {" "}
                Call Me
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body1">
              {roomState.address.add}, {roomState.address.city},
              {roomState.address.state}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{roomState.description}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} style={{ marginTop: "50px" }}></Grid>
    </Box>
  );
}
