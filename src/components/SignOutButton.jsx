import React from "react";
import { getFirebase } from "../hooks/firebase";
import { Button } from "@material-ui/core";
const SignOutButton = () => {
  const firebaseInstance = getFirebase();

  const signOut = async () => {
    try {
      if (firebaseInstance) {
        await firebaseInstance.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return <Button onClick={() => signOut()}> Sign out</Button>;
};

export default SignOutButton;
