import React from "react";
import { WaveTopBottomLoading } from "react-loadingg";
import {
  Grid,
  TextField,
  FormLabel,
  FormControl,
  FormGroup,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import PriceInputs from "./inputroom/inputprice";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import { State, City } from "country-state-city";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  Box: {
    margin: "auto",
    padding: "30px",
    maxWidth: "500px",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  Typography: {
    margin: "20px",
    textAlign: "center",
  },
});
export default function Sell() {
  const [cstate, setcstate] = React.useState([]);
  const [city, setcity] = React.useState([]);
  const [citycode, setCitycode] = React.useState("");
  const [alt, setImg] = React.useState();
  const [img, setImgimg] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const { push } = useHistory();
  const classes = useStyles();
  React.useEffect(() => {
    const state = State.getStatesOfCountry("IN");
    setcstate(state);
  }, []);
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
  }, [push]);
  React.useEffect(() => {
    const state = City.getCitiesOfState("IN", citycode);
    setcity(state);
  }, [citycode]);

  const { register, handleSubmit, control, errors } = useForm();
  const handelchange = (e) => {
    setCitycode(e.target.value);
  };
  const imgupload = (e) => {
    setImgimg(false);

    if (e.target.files[0]) {
      let filelen = [];
      const len = e.target.files["length"];
      for (let i = 0; i < len; i++) {
        if (Number(e.target.files[i].size) > 5082746) {
          setImgimg(true);
        }
        filelen.push(URL.createObjectURL(e.target.files[i]));
      }
      setImg(filelen);
    }
  };

  const onSubmit = async (data) => {
    if (img === false) {
      const {
        name,
        price,
        address: { add, city, state },
        facility: { wifi, food, water, electric },
        details: { bathrooms, rooms, kitchen, parking },
        description,
        images,
      } = data;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("address[add]", add);
      formData.append("address[city]", city);
      formData.append("address[state]", state);
      formData.append("facility[wifi]", wifi);
      formData.append("facility[food]", food);
      formData.append("facility[water]", water);
      formData.append("facility[electric]", electric);
      formData.append("details[bathrooms]", bathrooms);
      formData.append("details[rooms]", rooms);
      formData.append("details[kitchen]", kitchen);
      formData.append("details[parking]", parking);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        credentials: "include",
      };
      try {
        setLoad(true);
        window.scrollTo(0, 0);
        const res = await axiosInstance.post(
          "/api/room/addroom/",
          formData,
          config
        );

        const data = await res.data;

        if (data) {
          setLoad(false);
          push("/");
        }
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <Box className={classes.Box} maxWidth="xs">
        <Typography variant="h4" className={classes.Typography}>
          ADD ROOM
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Your Password"
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                inputRef={register({
                  required: "Password is required.",
                })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PriceInputs refprice={register} err={errors} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Enter Your Address"
                label="address"
                variant="outlined"
                fullWidth
                name="address.add"
                inputRef={register({
                  required: "address is required.",
                })}
                error={Boolean(errors.address?.add)}
                helperText={errors.address?.add?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.address?.city)}
              >
                <InputLabel>City</InputLabel>

                <Controller
                  render={(props) => (
                    <Select
                      value={props.value}
                      defaultValue=""
                      onChange={props.onChange}
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
                  )}
                  name="address.city"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "please choose your city.",
                  }}
                />
                <FormHelperText>{errors.address?.city?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                
                error={Boolean(errors.address?.state)}
              >
                <InputLabel>State</InputLabel>

                <Controller
                  render={(props) => (
                    <Select
                      value={props.value}
                      defaultValue=""
                      onChange={props.onChange}
                      onClick={handelchange}
                      label="State"
                    >
                      {cstate.map((item) => {
                        return (
                          <MenuItem key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                  name="address.state"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "please choose your state.",
                  }}
                />
                <FormHelperText>
                  {errors.address?.state?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Facility</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox inputRef={register()} name="facility.wifi" />
                    }
                    label="Wifi"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox inputRef={register()} name="facility.food" />
                    }
                    label="Food"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={register()}
                        name="facility.electric"
                      />
                    }
                    label="Electric"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox inputRef={register()} name="facility.water" />
                    }
                    label="Water"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Room"
                variant="outlined"
                fullWidth
                type="number"
                name="details.rooms"
                inputRef={register({
                  required: "Room is required.",
                })}
                error={Boolean(errors.details?.rooms)}
                helperText={errors.details?.rooms?.message}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Bathroom"
                variant="outlined"
                fullWidth
                name="details.bathrooms"
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Kitchen"
                variant="outlined"
                fullWidth
                name="details.kitchen"
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Parking"
                variant="outlined"
                fullWidth
                name="details.parking"
                inputRef={register()}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                placeholder="Enter Your Discription"
                label="Discription"
                variant="outlined"
                fullWidth
                name="description"
                inputRef={register({
                  required: "description is required.",
                })}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              {load && <WaveTopBottomLoading />}
              <label>
                <input
                  id="btn-upload"
                  name="images"
                  style={{ display: "none" }}
                  type="file"
                  onChange={imgupload}
                  accept="image/*"
                  ref={register({
                    required: "image is required.",
                  })}
                  multiple
                  error={img ? "true" : "false"}
                />
                <Button
                  className="btn-choose"
                  onChange={imgupload}
                  variant="outlined"
                  fullWidth
                  component="span"
                  color={
                    errors.images ? "secondary" : img ? "secondary" : "default"
                  }
                  startIcon={<CloudUploadIcon />}
                >
                  {alt
                    ? alt.map((item, index) => (
                        <img key={index} height="50px" src={item} alt={item} />
                      ))
                    : errors.images
                    ? errors.images?.message
                    : "Image Upload"}
                </Button>
              </label>
              {img && (
                <Typography variant="body2" color="secondary">
                  {" "}
                  Photo not allow more then 5MB{" "}
                </Typography>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              ADD ROOM
            </Button>
          </Grid>
        </form>
      </Box>
    </React.Fragment>
  );
}
