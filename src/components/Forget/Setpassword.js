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
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import { TouchBallLoading } from "react-loadingg";
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

export default function Setpassword() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [failed, setfailed] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const [verifylink, setVerfiylink] = React.useState(false);

  const { register, handleSubmit, errors } = useForm();
  const { push } = useHistory();
  let { id, token } = useParams();
  const onSubmit = async (data) => {
    const dataform = JSON.stringify(data);
    const { password, password2 } = data;
    if (password === password2) {
      try {
        const res = await axiosInstance.post(
          `/api/users/forget-password/${id}/${token}`,
          dataform
        );

        if (res.status === 200) {
          setfailed(res.data.message);
          setLoad(false);
          push("/signin");
        }
      } catch (err) {
        console.log(err);
        if (err.request.status === 403) {
          push("/notfound");
        }
        // const jsonData = JSON.parse(err.request.response);
        //  setfailed(jsonData.message);
        setOpen(true);
      }
    }else{
        setfailed("password not match");
        setOpen(true);
    }
  };
  React.useEffect(() => {
    setLoad(true);
    const check = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/users/forget-password/${id}/${token}`
        );

        if (res.status === 200) {
          setVerfiylink(true);
          setLoad(false);
        }
      } catch (err) {
        console.log(err);
        if (err.request.status === 403) {
          push("/notfound");
        }
        const jsonData = JSON.parse(err.request.response);
        setfailed(jsonData.message);
        setOpen(true);
        setLoad(false);
      }
    };
    check();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box className={classes.Box} maxWidth="xs">
      {load && <TouchBallLoading />}
      {verifylink && (
        <Box className={classes.paper} p={5}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Password
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
              <Grid item xs={12}>
                <TextField
                  placeholder="Re-enter Your Password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password2"
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
              Save Password
            </Button>
          </form>
          <Grid container justify="flex-end">
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
      )}
    </Box>
  );
}
