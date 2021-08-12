import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import io from 'socket.io-client';
import { useParams,useHistory } from "react-router-dom";
import ReactScrollToBottom from "react-scroll-to-bottom";
import axiosInstance from "../axios";
import { TouchBallLoading } from "react-loadingg";
import {Helmet} from "react-helmet";
let socket;
const useStyles = makeStyles({
  profile:{
    marginTop:"-20px"
  },
  messageArea: {
   height:"55vh",
    overflowY: 'auto'
  }
});

const Chat = () => {
  const [msg,setMsg]=React.useState([]);
  const [getmsg,setGetmsg]=React.useState([]);
  const [online,setOnline]=React.useState(false);
  const [load,setLoad]=React.useState(true);
  const [userid,setUserid]=React.useState("");
  const [user,setUser]=React.useState("");
  let { room } = useParams();
  const classes = useStyles();
  const { push } = useHistory();
  const valueRef = React.useRef('')
  const Serverurl='http://localhost:5000/';
  const timenow=new Date().toLocaleTimeString();
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
        
        setUserid(data.id)
        if (!data.id) {
          push("/signup");
        }
      });

      const data= async()=>{
        setLoad(true)
        try {
          const res = await axiosInstance.get(`/api/chat/${room}`);
          const datares = await res.data;
          setGetmsg(datares.data)
          setLoad(false)
        } catch (err) {
          console.log(err)
        }}
        data()

     
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(()=>{
  socket = io(Serverurl, { transports: ['websocket'] });
  socket.on("connect", function () {
    console.log("coonect");
    socket.emit('join',{to:userid})
  });
  socket.on("online", async(data)=>{
    const onlineuser=data.filter(item=>item.user===room)
    if(onlineuser.length !==0){
      setOnline(true)
    }else{
      setOnline(false)
    }
    
  });
  socket.on('recivemsg',(data)=>{
    setMsg(msg=>[...msg,data]);
    });

 if(msg.length !== 0){
  let df ={data:msg[msg.length - 1]};
  const dataform = JSON.stringify(df);
   fetch(`/api/chat/${room}`,  {
    method: "POST",
     body:dataform,
     headers: {
       Accept: "appllication/json",
      "Content-Type": "application/json",
     },
     credentials: "include",
  }).then(function (response) {
    return response.json();
  }).catch(error => {
    console.log(error)
  });;
 }
  return () => {
        socket.disconnect();
        socket.off();
    }
 
},[msg])// eslint-disable-line react-hooks/exhaustive-deps



React.useEffect(()=>{
  const data= async()=>{
  try {
    const res = await axiosInstance.get(`/api/chatuser/${room}`);
    const datares = await res.data;
    setUser(datares)
  } catch (err) {
    console.log(err)
  }}
  data()

  return () => {
    console.log("unmount");
  };
},[])// eslint-disable-line react-hooks/exhaustive-deps

 
const sendmsg=()=>{
    socket.emit('sendmsg',{to:room,msg:valueRef.current.value,time:timenow})
    setMsg(msg=>[...msg,{to:room,msg:valueRef.current.value,time:timenow}]);
    valueRef.current.value="";
 }
 const recmsg=()=>{
    return msg.map((item,index)=>{
          if(item.to===room){
            return ( <ListItem key={index}>
                <Grid container >
                    <Grid item xs={12}>
                        <ListItemText  align="right" primary={item.msg}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="right" secondary={item.time}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>)
          }
         else{
          return ( <ListItem key={index}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="left" primary={item.msg}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align="left" secondary={item.time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>)}
     })
 }
 const dbmsg=()=>{
  return getmsg.map((item,index)=>{
        if(item.to===room){
          return ( <ListItem key={index}>
              <Grid container >
                  <Grid item xs={12}>
                      <ListItemText  align="right" primary={item.msg}></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                      <ListItemText align="right" secondary={item.time}></ListItemText>
                  </Grid>
              </Grid>
          </ListItem>)
        }
       else{
        return ( <ListItem key={index}>
          <Grid container>
              <Grid item xs={12}>
                  <ListItemText align="left" primary={item.msg}></ListItemText>
              </Grid>
              <Grid item xs={12}>
                  <ListItemText align="left" secondary={item.time}></ListItemText>
              </Grid>
          </Grid>
      </ListItem>)}
   })
}

  return (
      <>
     { load && <TouchBallLoading/>}
        <Grid container className={classes.profile}>
        <Helmet>
        <title>{`${user.name} in RoomMate User For Best Room Rental : RoomMate`}</title>
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
            <Grid item xs={12} >
             
               <ListItem>
               <ListItemIcon>
               <Avatar alt={user.name} src={user.image}/>
              
               </ListItemIcon>
              <ListItemText primary={user.name}></ListItemText>
              { online && <h3>Online</h3>}
              </ListItem>
    
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            
            <Grid item xs={12}  >
                <List >
                  <ReactScrollToBottom className={classes.messageArea}>{dbmsg()} {recmsg()}</ReactScrollToBottom>
                   
                </List>
                
                
            </Grid>
            <Divider />
            <Grid container style={{padding: '5px'}}>
                    <Grid item xs={10}>
                        <TextField  variant="outlined" inputRef={valueRef} label="Type Something" fullWidth/>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Fab color="primary" aria-label="add" onClick={sendmsg}><SendIcon /></Fab>
                    </Grid>
                </Grid>
        </Grid>
      </>
  );
}

export default Chat;