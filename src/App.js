import React ,{Suspense,lazy} from "react";
import { Offline } from "react-detect-offline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Hidden } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Theme from "./components/Theme";
lazy(()=> import ('@fontsource/roboto'));
const Navbar = lazy(()=> import("./components/Navbar"));
const Footer = lazy(()=> import("./components/Footer"));
const NavBottom = lazy(()=> import("./components/NavBottom"));
const Room = lazy(()=> import("./components/Room"));
const Chat = lazy(()=> import("./components/Chat"));
const Chatlist = lazy(()=> import("./components/Chatlist"));
const Search = lazy(()=> import("./components/Search"));
const Sell = lazy(()=> import("./components/Sell"));
const Favorite = lazy(()=> import("./components/Favorite"));
const Profile = lazy(()=> import("./components/Profile"));
const Notfound = lazy(()=> import("./components/Notfound"));
const Signup = lazy(()=> import("./components/Signup"));
const Signin = lazy(()=> import("./components/Signin"));
const Roomview = lazy(()=> import("./components/Roomview"));
const Checkmail = lazy(()=> import('./components/Forget/Checkmail'));
const Setpassword = lazy(()=> import('./components/Forget/Setpassword'));
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
      
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar /> 
        </Suspense>
        <Container className={classes.root}>
        <Offline><Alert variant="filled" severity="error">No Internet Check Your Internet</Alert></Offline>
        
          <Switch>
            <Route exact path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <Room />
               </Suspense>
            </Route>
            <Route path="/search">
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
               </Suspense>
            </Route>
            <Route path="/chatlist">
            <Suspense fallback={<div>Loading...</div>}>
              <Chatlist />
               </Suspense>
            </Route>
            <Route path="/chat/:room">
            <Suspense fallback={<div>Loading...</div>}>
              <Chat />
               </Suspense>
            </Route>
            <Route path="/sell">
            <Suspense fallback={<div>Loading...</div>}>
              <Sell />
               </Suspense>
            </Route>
            <Route path="/favorite">
            <Suspense fallback={<div>Loading...</div>}>
              <Favorite />
               </Suspense>
            </Route>
            <Route exact path="/profile">
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
               </Suspense>
            </Route>
            <Route path="/signin">
            <Suspense fallback={<div>Loading...</div>}>
              <Signin />
               </Suspense>
            </Route>
            <Route path="/signup">
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
               </Suspense>
            </Route>
            <Route path="/roomview/:id">
            <Suspense fallback={<div>Loading...</div>}>
              <Roomview />
               </Suspense>
            </Route>
            <Route exact path="/forget-password">
            <Suspense fallback={<div>Loading...</div>}>
              <Checkmail />
               </Suspense>
            </Route>
            <Route path="/forget-password/:id/:token">
            <Suspense fallback={<div>Loading...</div>}>
              <Setpassword />
               </Suspense>
            </Route>
            <Route>
            <Suspense fallback={<div>Loading...</div>}>
              <Notfound />
               </Suspense>
            </Route>
          </Switch>
         
        
          <Suspense fallback={<div>Loading...</div>}>
            <Footer/>
          </Suspense>
        </Container>
        <Hidden mdUp>
          <Suspense fallback={<div>Loading...</div>}>
          <NavBottom />
          </Suspense>
        </Hidden>
      </Router>
     
    </ThemeProvider>
  );
}

export default App;
