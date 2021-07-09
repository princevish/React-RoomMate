import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../components/inputroom/Roomitem";
import { Grid } from "@material-ui/core";
import axiosInstance from "../axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
}));

const roomdata = async (setroomState) => {
  try {
    const res = await axiosInstance.get("/api/room");
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

  const room = roomState.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
        <Item item={item} />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {room}
      </Grid>
    </div>
  );
}
