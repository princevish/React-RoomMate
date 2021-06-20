import React ,{ useState } from 'react';
import {
    TextField, Box, Typography, Grid, Button, Link,
    Avatar
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axiosInstance from '../axios';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import MuiPhoneNumber from "material-ui-phone-number";
const useStyles = makeStyles((theme) => ({
    Box: {
        margin: 'auto'
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '500px',
        margin: 'auto',
        borderRadius: '15px',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [failed, setfailed] = React.useState('');
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const {
        register,
        handleSubmit,
        errors
    } = useForm();
    const {push} = useHistory();

    const handleOnChange = value => {
     
        if (value.length === 15) {
          setError(false);
          setPhone(value);
          
          
        }else{
            setError(true); 
            setPhone(value);
        }
      };

    const onSubmit = async (data) => {
       
        if (phone.length===15){
            const {name, email, password, image} = data

            const formData = new FormData();
            formData.append('image', image[0])
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('mobile', phone)
    
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            try {
    
                const res = await axiosInstance.post('/users/signup/', formData, config)
                console.log(res)
                const data = await res.data.user
                if (res.status === 201 && data) {
                    push('/');
                }
    
    
            } catch (err) {
                
                console.log(err)
                const jsonData = JSON.parse(err.request.response);
                setfailed(jsonData.message)
                setOpen(true)
    
            }
            
        }else{
            setError(true);
        }
        

    };

    return (
        <Box className={classes.Box} maxWidth="xs">

            <Box className={classes.paper} p={5}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                    {open && <Alert variant="outlined" severity="warning"
                       action={
                        <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                >
                        <CloseIcon fontSize="inherit" />
                         </IconButton>
                         }>
                     {failed }
                    </Alert>}
                    </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Enter Your E-mail Address"
                                label="E-mail"
                                variant="outlined"
                                fullWidth
                                name="email"
                                type="email"
                                inputRef={register({
                                    required: "E-mail Address is required.",
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Enter Your Fullname"
                                label="Fullname"
                                variant="outlined"
                                fullWidth
                                name="name"
                                inputRef={register({
                                    required: "Fullname is required.",
                                })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            /></Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Enter Your Password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                inputRef={register({
                                    required: "Password is required.",
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                   
                            <MuiPhoneNumber
                                regions={["asia"]}
                                defaultCountry='in'
                                placeholder="Enter Your Mobile no."
                                label="Mobile"
                                variant="outlined"
                                fullWidth
                                value={phone}
                                type="tel"
                                name="mobile"
                                onChange={handleOnChange}
                                error={error}
                                helperText={error?"Enter valid Number":""}
                                autoFocus={error}
                                required={true}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file"
                                name="image"
                                inputRef={register({
                                    required: "Image is required.",
                                })}
                                error={Boolean(errors.image)}
                                helpertext={errors.image?.message}
                                accept="image/*"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                push("/signin")
                            }}>
                            Already have an account? Sign in
                        </Link>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}