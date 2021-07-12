import React from "react";
import { Box, Grid, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import Item from "../components/inputroom/Roomitem";
import { TouchBallLoading } from "react-loadingg";
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
    height: "200px",
    width: "200px",
    justifyContent: "center",
    margin: "auto",
  },
  name: {
    fontSize: "20px",
    marginBottom: "5px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
  },
  email: {
    fontSize: "15px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
  },
  mobile: {
    fontSize: "15px",
    marginBottom: "10px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
      marginBottom: "10px",
    },
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

export default function Profile() {
  const classes = useStyles();
  const { push } = useHistory();
  const [user, setUser] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const [rdel, setRdel] = React.useState(false);

  const Userdata = async (setroomState, setLoad) => {
    try {
      const res = await axiosInstance.get("/api/users/list");
      const allPosts = await res.data;

      setroomState(allPosts.data);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
    return null;
  };

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
        if (!data.id) {
          push("/signup");
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    Userdata(setUser, setLoad);
  }, [rdel]);
  const logout = async () => {
    try {
      const res = await axiosInstance.get("/api/users/logout");
      if (res.status === 200) {
        push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const roomdel = async (id) => {
    try {
      const res = await axiosInstance.get(`/api/room/delete/${id}`);
      if (res.status === 200) {
        window.scrollTo(0, 0);
        setLoad(true);
        if (rdel) {
          setRdel(false);
        } else {
          setRdel(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const Roomitem = (user) => {
    if (user.user) {
      if (user.user.length !== 0) {
        return user.user.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Item item={item} ridfun={roomdel} rid={item._id} />
            </Grid>
          );
        });
      }
      return (
        <Typography variant="h4" component="h4" style={{ margin: "auto" }}>
          Not room found
        </Typography>
      );
    }
    return null;
  };

  return (
    <Box className={user ? classes.Box : ""} maxWidth="xs">
      {load && <TouchBallLoading />}
      {user && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              alt="Profile image"
              height="300px"
              className={classes.image}
              image={user.image}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box className={classes.info}>
              <Typography variant="h4" className={classes.name}>
                {user.name}
              </Typography>
              <Typography variant="h5" className={classes.email}>
                {user.email}
              </Typography>
              <Typography variant="h5" className={classes.mobile}>
                {user.mobile}
              </Typography>
              <Button variant="outlined" color="secondary" onClick={logout}>
                Signout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} style={{ marginTop: "50px" }}>
        <Roomitem user={user.room} />
      </Grid>
    </Box>
  );
}
