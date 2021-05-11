import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useInput } from "../hooks/useInput";
import { getFirebase } from "../hooks/firebase";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const DisplayAlert = ({ type, message }) => {
  if ((type = "success")) {
    return (
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    );
  } else if ((type = "error")) {
    return (
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
    );
  }
};

const SignUp = () => {
  const classes = useStyles();
  const email = useInput("");
  const password = useInput("");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [error, setError] = useState("");
  const firebaseInstance = getFirebase();
  let history = useHistory();

  const doSignUp = async (event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await firebaseInstance
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        setAuthenticatedUser(user);
        history.push("/dashboard");
        alert(`Welcome ${email.value}`);
      }
    } catch (error) {
      console.log("Error", error);
      setError(error);
    }
  };

  return (
    <>
      <div className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default SignUp;
