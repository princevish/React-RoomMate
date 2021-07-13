import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavBottom from "./components/NavBottom";
import Room from "./components/Room";
import Search from "./components/Search";
import Sell from "./components/Sell";
import Favorite from "./components/Favorite";
import Profile from "./components/Profile";
import Notfound from "./components/Notfound";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Hidden } from "@material-ui/core";
import Theme from "./components/Theme";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Roomview from "./components/Roomview";
import Checkmail from './components/Forget/Checkmail'
import Setpassword from './components/Forget/Setpassword'
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <Router>
        <Navbar />

        <Container className={classes.root}>
          <Switch>
            <Route exact path="/">
              <Room />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/sell">
              <Sell />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
           
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/roomview/:id">
              <Roomview />
            </Route>
            <Route exact path="/forget-password">
              <Checkmail />
            </Route>
            <Route path="/forget-password/:id/:token">
              <Setpassword />
            </Route>
            <Route>
              <Notfound />
            </Route>
          </Switch>
        </Container>
        <Hidden mdUp>
          {" "}
          <NavBottom />
        </Hidden>
      </Router>
    </ThemeProvider>
  );
}

export default App;
