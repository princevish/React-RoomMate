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
    console.log(err);
  }
};

const Roomitem = (user) => {
  if (user.user) {
    if (user.user.length !== 0) {
      return user.user.map((item) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Item item={item} />
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
  return true;
};

export default function Search() {
  const [cstate, setcstate] = React.useState([]);
  const [city, setcity] = React.useState([]);
  const [citycode, setCitycode] = React.useState("");
  const [cityvalue, setCityvalue] = React.useState("");
  const [statevalue, setStatevalue] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    const state = State.getStatesOfCountry("IN");
    setcstate(state);
  }, []);

  React.useEffect(() => {
    const state = City.getCitiesOfState("IN", citycode);
    setcity(state);
  }, [citycode]);

  React.useEffect(() => {
    Roomdata(setRoom, statevalue, cityvalue,setLoad);
  }, [cityvalue, statevalue]);

  const handelchange = (e) => {
    setCitycode(e.target.value);
    setStatevalue(e.target.value);
    setLoad(true);
  };

  const handlecity = (e) => {
    setCityvalue(e.target.value);
    setLoad(true);
  };

  return (
    <Grid container spacing={3} style={{ padding: "10px" }}>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>State</InputLabel>

          <Select value={statevalue} onChange={handelchange} label="State">
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
        <Roomitem user={room} />

      </Grid>
    </Grid>
  );
}
