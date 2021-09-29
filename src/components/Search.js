import React from "react";
import Item from "../components/inputroom/Roomitem";
import axiosInstance from "../axios";
import { WaveTopBottomLoading } from "react-loadingg";
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { State, City } from "country-state-city";
import {Helmet} from "react-helmet";



const Roomdata = async (roomState, statevalue, cityvalue,setLoad) => {
  try {
    if (statevalue && cityvalue) {
      const res = await axiosInstance.get(
        `/api/room/room/${statevalue}/${cityvalue}`
      );
      const allPosts = await res.data;

      roomState(allPosts.data);
      setLoad(false);
    } else {
      if (statevalue) {
       
        const res = await axiosInstance.get(`/api/room/room/${statevalue}`);
        const allPosts = await res.data;

        roomState(allPosts.data);
        setLoad(false);
      }
    }
  } catch (err) {
  
  }
};

const Roomitem = ({user}) => {
 
    if (user.length !== 0) {
      return user.map((item,index) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Item item={item} />
          </Grid>
        );
      });
    }else{
    return (
      <Typography variant="h5"  style={{ margin: "auto",height: "50vh"}}>
        Not room found
      </Typography>
    );
    }
};

export default function Search() {
  const [cstate, setcstate] = React.useState([]);
  const [city, setcity] = React.useState([]);
  const [citycode, setCitycode] = React.useState("");
  const [cityvalue, setCityvalue] = React.useState("");
  const [statevalue, setStatevalue] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const [type, setCategory] = React.useState("");
  const [rcategory, setRcategory] = React.useState([]);
  const [onlyfor, setOnlyfor] = React.useState("");
  const [ronlyfor, setRonlyfor] = React.useState([]);

  React.useEffect(() => {
    setLoad(false);
    const state = State.getStatesOfCountry("IN");
    setcstate(state);
    return() => {
      console.log("unmout")
    }
  }, []);

  React.useEffect(() => {
    const state = City.getCitiesOfState("IN", citycode);
    setcity(state);
    return() => {
      console.log("unmout")
    }
  }, [citycode]);

  React.useEffect(() => {
    Roomdata(setRoom, statevalue, cityvalue,setLoad);
    return() => {
      console.log("unmout")
    }
  }, [cityvalue, statevalue]);

  const handlechange = (e) => {
    setCategory("");
    setOnlyfor("")
    setCitycode(e.target.value);
    setStatevalue(e.target.value);
    setCityvalue("");
    setLoad(true);
  };

  const handlecity = (e) => {
    setCategory("");
    setOnlyfor("")
    setCityvalue(e.target.value);
    setLoad(true);
  };
  
  
  const handlecategory = (e) => {
    let ar=[]
    setCategory(e.target.value);
    setRcategory([]);
    setOnlyfor("")
    
    if(room.length !== 0){
        let cate =room.find(item=>item.type===e.target.value);
        if(cate !== undefined){
        ar.push(cate)
        setRcategory(ar);
        }else{ 
          setRcategory([]);
  
        }
    }
  };
const handleFor=(e) => {
     let ar=[]
    setOnlyfor(e.target.value);
    setRonlyfor([]);
    if(room.length !== 0){
      let cate =room.find(item=>item.onlyfor===e.target.value);
      
      if(cate !== undefined){
      ar.push(cate)
      setRonlyfor(ar);

      }else{ 
        setRonlyfor([]);

      }
  }

  if(rcategory.length !== 0){
    let rcate =rcategory.find(item=>item.onlyfor===e.target.value);
    if(rcate !== undefined){
    ar.push(rcate)
    setRonlyfor(ar);
    }else{ 
      setRonlyfor([]);

    }
}
}
  return (
    <Grid container spacing={3} style={{ padding: "10px"}}>
      <Helmet>
        <title>Search in RoomMate For Best Room Rental : RoomMate</title>
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
    <Grid item xs={6} sm={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>For</InputLabel>

          <Select value={onlyfor} onChange={handleFor} label="For" defaultValue = "">
          <MenuItem value="Boys">Boys</MenuItem>
                          <MenuItem value="Girls">Girls</MenuItem>
                          <MenuItem value="Boys & Girls">Boys & Girls</MenuItem>
                         
           
          </Select>
        </FormControl>
      </Grid>
       <Grid item xs={6} sm={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Type</InputLabel>

          <Select value={type} onChange={handlecategory} label="type" defaultValue = "">
                <MenuItem value="Room">Room</MenuItem>
                <MenuItem value="Hostel">Hostel</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
                <MenuItem value="Partner">Partner</MenuItem>
           
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
          <Select
            value={cityvalue}
            defaultValue=""
            onChange={handlecity}
            label="City"
          >
            <MenuItem value="" disabled>
              Select City
            </MenuItem>
            {city &&
              city.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>State</InputLabel>

          <Select value={statevalue} onChange={handlechange} label="State" defaultValue = "">
            {cstate.map((item) => {
              return (
                <MenuItem
                  key={item.isoCode}
                  value={item.isoCode}
                  name={item.name}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
     
       
      <Grid container spacing={2} style={{ marginTop: "50px" }}>
      {load && <WaveTopBottomLoading />}
      {onlyfor ? <Roomitem user={ronlyfor} />: type ?(  <Roomitem user={rcategory} />):(<Roomitem user={room} />)}
      </Grid>
    </Grid>
  );
}
