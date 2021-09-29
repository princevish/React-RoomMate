import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  CardMedia,
  CardActions,
  Card,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import WifiIcon from "@material-ui/icons/Wifi";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import SubShare from "../Share";

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
    }
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
    padding: "1px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  share: {
    marginLeft: "auto",
  },
}));

export default function Item({ item,ridfun, rid }) {

  const classes = useStyles();
  const [fav, setFav] = useState(false);
  const [uf, setUf] = useState("");
  const [share, setShare] = useState(false);
  const [setuserid, setSetuserid] = useState(false);
  const { push } = useHistory();



 
  React.useEffect(() => {
    fetch(
      "/api/auth",
      {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {}
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        if (data.id) {
          setSetuserid(true);
        }else{
          setSetuserid(false);
        }
      });
  }, [push]); 

  const favtrue = (id, fs) => {
    return fs.includes(id);
  };
  const handleFav = async (id) => {
    const like = await axiosInstance.get(`/api/room/fav/${id}`);
    if (like.status === 201) {
      setFav(false);
    } else {
      setFav(true);
    }
  };

  useEffect(() => {
    fetch(
      "/api/users/list",
      {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {}
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data?.fav) {
          setUf(data.data.fav);
        }
      });
      return () => {
        console.log("unmount");
      };
  }, []);

  useEffect(() => {
    if (favtrue(item._id, uf)) {
      setFav(true);
    }
    return () => {
      console.log("unmount");
    };
  }, [uf, item._id]);

  const handleroom = (item) => {
    push(`/roomview/${item._id}`);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="profile" alt={item.users.name} src={item.users.image}/>}
        action={setuserid &&
          (rid ? (
            <IconButton
              aria-label="favorite"
              onClick={() => ridfun(item._id)}
            >
              <CancelIcon color="secondary" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="favorite"
              onClick={() => handleFav(item._id)}
            >
              {fav ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderOutlinedIcon color="secondary" />
              )}
            </IconButton>
          ))
        }
        title={item.name + ` (${item.reviews.length})`}
        subheader={`${item.address.city},${item.address.state}`}
      />
      <CardActionArea onClick={() => handleroom(item)}>
        <CardMedia
          className={classes.media}
          image={item.images[0]}
          title="room_image"
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
        <CardContent className={classes.details}>
          <Typography variant="body2">TYPE : <b>{item.type}</b></Typography>
          <Typography variant="body2">FOR :<b> {item.onlyfor}</b></Typography>
      
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Typography variant="h6" component="h6" style={{ marginLeft: "15px" }}>
          {item.price}{" "}
        </Typography>

        <IconButton className={classes.share} aria-label="share"  onClick={() => setShare(true)}>
         {share? <SubShare url={String(window.location +`roomview/${item._id}`)} title={item.name} />:<ShareIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
