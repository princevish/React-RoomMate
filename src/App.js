import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import NavBottom from './components/NavBottom';
import Room from './components/Room';
import Search from './components/Search';
import Sell from './components/Sell';
import Favorite from './components/Favorite';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Container from '@material-ui/core/Container'
import { makeStyles,ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Theme from './components/Theme';
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:theme.spacing(10),
    marginBottom:theme.spacing(10)
  }
}));
function App() {
 const classes=useStyles()
  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
    
    <Router>
    <Navbar/>
   
      <Container className={classes.root} >
      <Switch>
          <Route exact path="/" >
            <Room />
          </Route>
          <Route  path="/search">
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
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/signin">
            <Signin/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
        </Switch>
        
      </Container>
  <NavBottom/>
    
    </Router>
    </ThemeProvider>
  );
}

export default App;
