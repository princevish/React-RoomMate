import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import { WaveTopBottomLoading } from "react-loadingg";
import {Helmet} from "react-helmet";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
   
    overflowY: 'auto'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  nochat:{
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Chatlist = () => {
  const [load, setLoad] = React.useState(true);
  const [user,setUser]=React.useState([]);
  const [userid,setUserid]=React.useState("");
  const classes = useStyles();
  const { push } = useHistory();
const chatdata = async(id)=>{
    
  
        try {
            const res = await axiosInstance.get("api/chataddlist");
            if (res.status === 200) {
               const d=res.data.data.map(item=>item.userlist)
               setUser(...d)
            
            }
          } catch (err) {
            console.log(err);
        }
 

}
React.useEffect(()=>{
  setLoad(true)
  fetch(
    "/api/auth",
    {
      method: "GET",
      headers: {
        Accept: "appllication/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      setUserid(data.id)
      chatdata(data.id)
      setLoad(false)
      if (!data.id) {
        push("/signup");
      }
    });
    return () => {
      console.log("unmount");
    };

},[])// eslint-disable-line react-hooks/exhaustive-deps
const chatroom=(id)=>{
  push(`/chat/${id}`)
}

  return (
      <div style={{  minHeight: "80vh"}}>
        <Grid container>
        <Helmet>
        (<title>Chat List of Room Owner in RoomMate For Best Room Rental : RoomMate</title>)
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
            <Grid item xs={12} >
                
               { !user && <Typography variant="h5" className={classes.nochat}>Not Chat User</Typography>}
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
        {load && <WaveTopBottomLoading />}

            <Grid item xs={12} className={classes.borderRight500}>
              
                {user && user.map((item,index)=>{
                        return(<div key={index}>
                            {userid === item._id ? <p style={{display: 'none'}} key={index}>{index}</p>:( 
                          <List key={index}><ListItem button onClick={()=>chatroom(item._id)} >
                            <ListItemIcon>
                            <Avatar alt={item.name} src={item.image}/>
                            </ListItemIcon>
                            <ListItemText primary={item.name}></ListItemText>
                            </ListItem></List>)}
                            
                            </div>
                        )
                    })}
                    
                
            </Grid>
        </Grid>
      </div>
  );
}

export default Chatlist;