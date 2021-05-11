import React from "react";
import SignIn from "./components/SignIn";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Details from "./components/Details";

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <CssBaseline />
        <Typography variant="h2" className={classes.container} align="center">
          Expensly
        </Typography>
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/dashboard" exact>
            <Details />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
