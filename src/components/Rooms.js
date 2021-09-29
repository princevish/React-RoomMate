import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../components/inputroom/Roomitem";
import { Grid } from "@material-ui/core";
import axiosInstance from "../axios";
import { Button } from "@material-ui/core";
import { PointSpreadLoading } from "react-loadingg";
import {Helmet} from "react-helmet";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  btn: {
    display: "flex",
    margin: "1rem auto",
  },
}));



export default function Rooms({type}) {
  const [roomState, setroomState] = useState([]);
  const [roomnum, setRoomnum] = useState(8);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const roomdata = async (setroomState, roomnum, setLoad ,type) => {
      try {
        const res = await axiosInstance.get(`/api/room/r/${type}/${roomnum}`);
        const allPosts = await res.data;
    
        setroomState(allPosts.data);
        setLoad(false);
      } catch (err) {
       
      }
    };
    roomdata(setroomState, roomnum, setLoad,type);
    return () => {
        console.log("unmount");
      };
  }, [roomnum]);// eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();

  const room = roomState.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4}  key={item._id}>
        <Item item={item} />
      </Grid>
    );
  });

  const handleclick = () => {
    setLoad(true);
    setRoomnum((prevState) => {
      return prevState + 8;
    });
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{`${type} in RoomMate For Best Room Rental : RoomMate`}</title>
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
      {load && <PointSpreadLoading />}
      <Grid container spacing={2}>
        {room}
      </Grid>
      {Boolean(roomState.length) && (
        <Button
          onClick={handleclick}
          color="primary"
          variant="outlined"
          className={classes.btn}
        >
          Load More
        </Button>
      )}
    </div>
  );
}