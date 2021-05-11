import React, { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useStyles } from "../styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useInput } from "../hooks/useInput";
import { getFirebase } from "../hooks/firebase";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const classes = useStyles();
  const firebaseInstance = getFirebase();
  const email = useInput("");
  const password = useInput("");

  const [currentUser, setCurrentUser] = useState(null);

  const doSignIn = async (event) => {
    event.preventDefault();
    try {
      if (firebaseInstance) {
        const user = await firebaseInstance
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    const firebase = getFirebase();
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <>
      <div className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default SignIn;
