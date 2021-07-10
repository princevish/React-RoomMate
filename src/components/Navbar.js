import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2196f3",
  },

  title: {
    flexGrow: 1,
    textDecoration:"none",
    color:"white"
  },
  fabButton: {
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    backgroundColor: "#ff384c",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.title}>
        <Typography variant="h6" className={classes.title}>
          RoomMate
        </Typography></Link>
        <Hidden smDown>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
          >
            <BottomNavigationAction
              component={Link}
              to="/sell"
              label="AddRoom"
              style={{ color: "#ffff" }}
              value="Add"
              icon={<AddCircleOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/"
              label="Home"
              style={{ color: "#ffff" }}
              value="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/search"
              label="Search"
              style={{ color: "#ffff" }}
              value="Search"
              icon={<SearchIcon />}
            />

            <BottomNavigationAction
              component={Link}
              to="/favorite"
              label="Favorite"
              style={{ color: "#ffff" }}
              value="Favorite"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/profile"
              label="Profile"
              style={{ color: "#ffff" }}
              value="Profile"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
