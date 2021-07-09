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
  text: {
    justifyContent: "center",
    right: "50%",
  },
}));

export default function Favorite() {
  const [roomstate, setroomState] = useState(false);

  const Fav = ({ items }) => {
    return items.map((item) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <Item item={item} />
        </Grid>
      );
    });
  };
  const roomdata = async (setroomState) => {
    try {
      const res = await axiosInstance.get("/api/users/fav");
      const allPosts = await res.data;
      setroomState(allPosts.data.fav);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    roomdata(setroomState);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {roomstate && <Fav items={roomstate} />}
      </Grid>
    </div>
  );
}
