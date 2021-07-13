import React from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Button,
  Link,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  Box: {
    margin: "auto",
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
    margin: "auto",
    borderRadius: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [failed, setfailed] = React.useState("");
  const { register, handleSubmit, errors } = useForm();
  const { push } = useHistory();

  const onSubmit = async (data) => {
    const dataform = JSON.stringify(data);
    try {
      const res = await axiosInstance.post("/api/users/signin/", dataform);

      const datares = await res.data;
      if (res.status === 202 && datares) {
        push("/");
      }
    } catch (err) {
      console.log(err);
      const jsonData = JSON.parse(err.request.response);

      if (jsonData.message[0].msg) {
        setfailed(jsonData.message[0].msg);
        setOpen(true);
      } else {
        setfailed(jsonData.message);
        setOpen(true);
      }
    }
  };

  return (
    <Box className={classes.Box} maxWidth="xs">
      <Box className={classes.paper} p={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signin
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {open && (
                <Alert
                  variant="outlined"
                  severity="warning"
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
                  }
                >
                  {failed}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Enter Your E-mail Address"
                label="E-mail"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                inputRef={register({
                  required: "E-mail Address is required.",
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                placeholder="Enter Your Password"
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                inputRef={register({
                  required: "Password is required.",
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                type="password"
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
            Signin
          </Button>
        </form>
        <Grid container style={{justifyContent:"space-between"}}>
        <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                push("/forget-password");
              }}
              color="secondary"
             style={{marginBottom:"10px"}}
            >
              Forget Password ?
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                push("/signup");
              }}
            >
              You have Not Account? SignUp
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
