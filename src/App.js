import React from "react";
import SignIn from "./components/SignIn";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography variant="h2" className={classes.container} align="center">
        Expensly
      </Typography>
      <SignIn />
    </Container>
  );
};

export default App;
