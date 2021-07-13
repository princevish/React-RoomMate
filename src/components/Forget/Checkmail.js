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
import axiosInstance from "../../axios";
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

export default function Checkmail() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [failed, setfailed] = React.useState("");
  const { register, handleSubmit, errors } = useForm();
  const { push } = useHistory();

  const onSubmit = async (data) => {
    const dataform = JSON.stringify(data);
    setOpen(false);
    try {
      const res = await axiosInstance.post("/api/users/forget-password", dataform);
      if (res.status === 200 ) {
        setfailed(res.data.message);
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
      const jsonData = JSON.parse(err.request.response);
        setfailed(jsonData.message);
        setOpen(true);
  
    }
  };

  return (
    <Box className={classes.Box} maxWidth="xs">
      <Box className={classes.paper} p={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Forget Password
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

           
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Forget Password
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
    </Box>
  );
}
