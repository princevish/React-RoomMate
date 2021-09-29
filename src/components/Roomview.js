import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  CardContent,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import WifiIcon from "@material-ui/icons/Wifi";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import { PointSpreadLoading } from "react-loadingg";
import { Button,TextField,Avatar,ListItemText,ListItemAvatar,List,ListItem } from "@material-ui/core";
import SubShare from "./Share"
import {Helmet} from "react-helmet";


const useStyles = makeStyles((theme) => ({
  root:{  minHeight: "80vh"},
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
    height: "6rem",
    width: "6rem",
    justifyContent: "center",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      borderRadius: "50%",
      height: "10rem",
      width: "10rem",
      justifyContent: "center",
      margin: "auto",
    },
  },
  imgroom: {
    borderRadius: "2%",
  },
  icon: {
    flexGrow: "1",
    display: "flex",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "space-around",
  },
  detail: {
    display: "flex",
    backgroundColor: "#2196f3",
    color: "white",
    alignContent: "center",
    justifyContent: "space-around",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    marginBottom: "1rem",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  share: {
    
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop:" 12px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  comment: {
    
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,

  }
}));

const roomdata = async (setroomState, params, setLoad, push) => {
  try {
    const res = await axiosInstance.get(`/api/room/roomview/${params}`);
    const allPosts = await res.data;

    setroomState(allPosts.data);
    setLoad(false);
  } catch (err) {
    if (err.request.status === 404) {
      push("/notfound");
    }
  }
};

export default function Roomview() {
  const [roomState, setroomState] = useState("");
  const [userid, setSetuserid] = useState("");
  const [load, setLoad] = useState(true);
  const [comment, setComment] = useState("");
  const [dcomment, setDcomment] = useState([]);
  const [cr, setCr] = useState(1);
  const { push } = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    roomdata(setroomState, id, setLoad, push);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


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
        setSetuserid(data.id);
        if (!data.id) {
          push("/signup");
        }
      });
  }, [push]); 


 const chatbox =async(id,rid)=>{
  
  try {

    await axiosInstance.get(`/api/chatadd/${id}/${rid}`);
    
    push(`/chat/${id}`);
 
  } catch (err) {
   
  }
 }
 useEffect(() => {
   

   const dataform=async(id)=>{
     try{
     const res=await axiosInstance.get(`/api/room/review/${id}`);
     const com=await res.data;    
     setDcomment(com.data)  }
     catch(e){console.log(e);}

    }
   dataform(id);
   return() => {
     console.log("unmount")
   }

 }, [cr])// eslint-disable-line react-hooks/exhaustive-deps
 const handleComment=async(id)=>{
   if(comment){
     try{
    const dataform = JSON.stringify( {"data":comment});
    const res = await axiosInstance.post(
      `/api/room/review/${id}`,
      dataform,
      {credentials: "include"}
    );
    await res.data;
    setCr((prevState) => {
      return prevState + 1;
    });
    setComment("")}catch(e){console.log(e)}
    
   
 }}

  return (
    <Box className={roomState ? classes.Box : classes.root} maxWidth="xs">
      {load && <PointSpreadLoading />}
      {roomState && (
        <Grid container spacing={3}>
          <Helmet>
       ( <title>{roomState.name} in {roomState.type} RoomMate For Best Room Rental : RoomMate</title>)
        <meta name="description" content={ `${roomState.address.add} ${roomState.address.city}
              ${roomState.address.state} ${roomState.description} the Information
about Rooms/Flats/Houses which is available for Rent`} />
    </Helmet>
          <Grid item xs={12}>
            <Typography variant="h6">{roomState.name} </Typography>
          </Grid>
          <Carousel>
            {roomState.images.map((item, i) => (
              <CardMedia
                key={i}
                component="img"
                alt="room image"
                className={classes.imgroom}
                image={item}
              />
            ))}
          </Carousel>
        
          <Grid container xm={12}>
            <CardContent className={classes.icon}>
              <WifiIcon
                color={roomState.facility.wifi ? "primary" : "disabled"}
              />
              <FastfoodIcon
                color={roomState.facility.food ? "primary" : "disabled"}
              />
              <FlashOnIcon
                color={roomState.facility.electric ? "primary" : "disabled"}
              />
              <LocalDrinkIcon
                color={roomState.facility.water ? "primary" : "disabled"}
              />
            </CardContent>
          </Grid>
          <Grid container xm={12}>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.rooms || 0} Room
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.bathrooms || 0} Bathroom
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.kitchen || 0} Kitchen
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.detail}>
              <Typography variant="subtitle1">
                {roomState.details.parking || 0} Parking
              </Typography>
              
            </Grid>
            <CardContent className={classes.icon} >
            <Grid item xs={6} sm={3} className={classes.detail}>
            <Typography  variant="subtitle1">TYPE : <b>{roomState.type}</b></Typography>
           </Grid>
           <Grid item xs={6} sm={3} className={classes.detail}>
           <Typography  variant="subtitle1">FOR :<b> {roomState.onlyfor}</b></Typography>
           </Grid> </CardContent>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              alt={roomState.users.name}
              className={classes.image}
              image={roomState.users.image}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box className={classes.info}>
              <Typography variant="h6">{roomState.users.name}</Typography>
              <Typography variant="subtitle1">
                {roomState.users.email}
              </Typography>
             
              {userid !== roomState.users._id && <Button
                variant="outlined"
                style={{ marginTop: "10px" }}
                color="primary"
                onClick={()=>chatbox(roomState.users._id,roomState._id)}
              >
               
                Chat
              </Button>}
              
            </Box>
            <Box className={classes.share}>
              <SubShare title={roomState.name}/>
              </Box>  
            
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body1">
              {roomState.address.add}, {roomState.address.city},
              {roomState.address.state}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{roomState.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">Reviews ({roomState.reviews.length})</Typography>
            <div className={classes.comment}>
            {dcomment.length !== 0 && dcomment.map((item,index)=>{
                        return(<div key={index}>
                          
                          <List key={index} ><ListItem alignItems="flex-start" >
                          <ListItemAvatar>
                            <Avatar alt={item.user.name} src={item.user.image}/>
                            </ListItemAvatar>
                            <ListItemText  key={index} primary={item.user.name} secondary={
                           item.comment
                              }></ListItemText>
                            </ListItem></List>
                            
                            </div>
                        )
                    })}
                    
            </div>
            <TextField
                placeholder="Enter Your Comment"
                label="Commnet"
                variant="outlined"
                fullWidth
                name="comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                style={{marginTop:"12px"}}
              />
              <br/>
              <Button variant="contained" color="primary" fullWidth style={{marginTop:"10px"}} onClick={()=>handleComment(roomState._id)}>Submit</Button>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} style={{ marginTop: "50px" }}></Grid>
    </Box>
  );
}
