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

export default function Item({ item,ridfun, rid }) {
  const classes = useStyles();
  const [fav, setFav] = useState(false);
  const [uf, setUf] = useState("");
  const { push } = useHistory();
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
  }, []);

  useEffect(() => {
    if (favtrue(item._id, uf)) {
      setFav(true);
    }
  }, [uf, item._id]);

  const handleroom = (item) => {
    push(`/roomview/${item._id}`);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="profile" src={item.users.image}></Avatar>}
        action={
          rid ? (
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
          )
        }
        title={item.name}
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
