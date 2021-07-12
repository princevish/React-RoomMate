import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../components/inputroom/Roomitem";
import { Grid } from "@material-ui/core";
import axiosInstance from "../axios";
import { DiamonLoading } from "react-loadingg";
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
  const [load, setLoad] = useState(true);
 
  const Fav = ({ items }) => {
    return items.map((item) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <Item item={item} />
        </Grid>
      );
    });
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
  }, [load]);
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
       {load && <DiamonLoading />}
      <Grid container spacing={2}>
        {roomstate && <Fav items={roomstate} />}
      </Grid>
    </div>
  );
}
