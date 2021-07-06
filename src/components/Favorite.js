import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../components/inputroom/Roomitem";
import { Grid, Typography } from "@material-ui/core";
import axiosInstance from "../axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  text: {
    justifyContent: "center",
    right: "50%",
  },
}));

const roomdata = async (setroomState) => {
  try {
    const res = await axiosInstance.get("/api/users/fav");
    const allPosts = await res.data;
    setroomState(allPosts.data.fav);
  } catch (err) {
    console.log(err);
  }
};

export default function Favorite() {
  const [roomState, setroomState] = useState([]);

  useEffect(() => {
    roomdata(setroomState);
  }, []);

  const classes = useStyles();
  if (roomState.length === 0) {
    return (
      <div className={classes.root}>
        {
          <Typography variant="h4" component="h4" className={classes.text}>
            Empty
          </Typography>
        }
      </div>
    );
  }
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
