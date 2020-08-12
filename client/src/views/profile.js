import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Highlight from "../components/highlight";
import { Grid, Button } from "@material-ui/core";
import Loading from "../components/loading";


const Profile = () => {

  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  
  const logAccessToken = () => async (event) => {
    console.log(await getAccessTokenSilently());
  }

  if(isLoading){
    return (
      <Loading />
      );
  }
  const { name, picture, email } = user;
  return (
    <Grid container justify='center'>
      <Grid item md={6} >
        <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
        />
      </Grid>
      <Grid item md={6}>
        <h2>Name: {name}</h2>
        <p className="lead text-muted">email: {email}</p>
      </Grid>
      <Grid item>
        <Button onClick={logAccessToken()}>
          Access Token
        </Button>
      </Grid>
    </Grid>
  );  
};

export default Profile;
