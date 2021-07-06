import React from 'react';

import {Grid,TextField,FormLabel,FormControl,FormGroup
,FormControlLabel,Checkbox,Button,Select} from '@material-ui/core';
import {  InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import {useForm,Controller} from "react-hook-form";
import PriceInputs from "./inputroom/inputprice";
import {useHistory} from "react-router-dom";
import axiosInstance from '../axios';
import { State, City }  from 'country-state-city';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography } from '@material-ui/core';


export default function Sell() {
   
    const [cstate,setcstate]=React.useState([])  
    const [city,setcity]=React.useState([])  
    const [citycode,setCitycode]=React.useState("")
    const [alt, setImg] = React.useState();
    const {push} = useHistory();
    React.useEffect(() => {
      const state=State.getStatesOfCountry('IN')
          setcstate(state) 
    }, [])
    React.useEffect(() => {
      fetch('/api/auth', {
        method: 'GET',
        headers:{
          Accept:"appllication/json",
          "Content-Type":"application/json"
        },credentials:"include"
      }, {})
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if(!data.id){
          push('/signup')
        }
      })
    },[push])
    React.useEffect(() => {
      const state=City.getCitiesOfState('IN',citycode)
          setcity(state) 
    }, [citycode])
    
    const {
        register,
        handleSubmit,control,
        errors
    } = useForm();
   const handelchange=(e)=>{
     setCitycode(e.target.value)
   }
   const imgupload= (e) => {
  
    if(e.target.files[0]) {
      let filelen=[]
      const len =e.target.files['length']
      for (let i = 0; i < len; i++) { 
        filelen.push(URL.createObjectURL(e.target.files[i]))
      }
     setImg(filelen)
      
    } }
const onSubmit = async (data) => {
       
           
            const {name, price, address:{add,city,state},facility:{wifi,food,water,electric},details:{bathrooms,rooms,kitchen,parking},description, images} = data

            const formData = new FormData();
           
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('address[add]', add)
            formData.append('address[city]', city)
            formData.append('address[state]', state)
            formData.append('facility[wifi]', wifi)
            formData.append('facility[food]', food)
            formData.append('facility[water]', water)
            formData.append('facility[electric]', electric)
            formData.append('details[bathrooms]', bathrooms)
            formData.append('details[rooms]', rooms)
            formData.append('details[kitchen]', kitchen)
            formData.append('details[parking]', parking)
            for (let i = 0; i < images.length; i++) { 
             
              formData.append('images', images[i])
            }
          
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },credentials:"include"
            }
            try {
             
                const res = await axiosInstance.post('/room/addroom/', formData, config)
             
                const data = await res.data
                
                if ( data) {
                    push('/');
                }
    
    
            } catch (err) {
                
                console.log(err)
            }
            
    };

  return (
    <React.Fragment>
      <Typography variant='h4' center='true'>Add Room</Typography>
        <form  onSubmit={handleSubmit(onSubmit)} >
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
        <PriceInputs refprice={register} err={errors}/>
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
           <InputLabel >
             City
           </InputLabel>
           
           <Controller
             render={(props) => (
               <Select value={props.value} defaultValue = ""   onChange={props.onChange} label="City">
                 <MenuItem value="" disabled>Select City</MenuItem>
                {city && city.map((item,index)=>{return (<MenuItem key={index} value={item.name}>{item.name}</MenuItem>)} )}
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
            <InputLabel >
              State
            </InputLabel>
            
            <Controller
              render={(props) => (
                <Select value={props.value} defaultValue = "" onChange={props.onChange} onClick={handelchange} label="State">
                 {cstate.map((item)=>{return (<MenuItem key={item.isoCode} value={item.isoCode }>{item.name}</MenuItem>)} )}
                  
                </Select>
              )}
              name="address.state"
              control={control}
              defaultValue=""
              rules={{
                required: "please choose your state.",
              }}
            />
            <FormHelperText>{errors.address?.state?.message}</FormHelperText>
          </FormControl>
        </Grid>
       
        <Grid item xs={12}>
      
        <FormControl component="fieldset" >
        <FormLabel component="legend">Facility</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox  inputRef={register()}  name="facility.wifi" />}
            label="Wifi"
          />
          <FormControlLabel
            control={<Checkbox  inputRef={register()}  name="facility.food" />}
            label="Food"
          />
          <FormControlLabel
            control={<Checkbox  inputRef={register()}  name="facility.electric" />}
            label="Electric"
          />
           <FormControlLabel
            control={<Checkbox  inputRef={register()}  name="facility.water" />}
            label="Water"
          />
        </FormGroup>
      
      </FormControl>
  
        </Grid>
        <Grid item xs={4} sm={3}>
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
        <Grid item xs={4} sm={3}>
            <TextField
             type="number"
               label="Bathroom"
               variant="outlined"
               fullWidth
               name="details.bathrooms"
               inputRef={register()}
                />
        </Grid>
        <Grid item xs={4} sm={3}>
            <TextField
               type="number"
               label="Kitchen"
               variant="outlined"
               fullWidth
               name="details.kitchen"
               inputRef={register()}
                
                />
        </Grid>
        <Grid item xs={4} sm={3}>
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
        <label >
       
          <input
            id="btn-upload"
            name="images"
            style={{ display: 'none' }}
            type="file"
            onChange={imgupload}
            ref={register({
              required: "image is required.",
         })}
            multiple
           
             />
          <Button
            className="btn-choose"
            onChange={imgupload}
            variant="outlined"
            fullWidth
            component="span"
            color={errors.images?"secondary" :"default"}
            startIcon={<CloudUploadIcon />}
           
           >
            { alt ?alt.map((item,index)=>(<img key={index} height="50px" src={item} alt={item}/>)): errors.images?errors.images?.message:"upload"}
          </Button>
            
        </label>
        </Grid>
        <Button
            type="submit"
              fullWidth
              variant="contained"
              color="primary">
             ADD
        </Button>
      </Grid>
     </form>
    </React.Fragment>
  );
}