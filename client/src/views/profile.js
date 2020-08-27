import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Button } from "@material-ui/core";
import Loading from "../components/loading";
import { useRouteMatch } from "react-router-dom";
import FileUpload from "../components/fileUpload";


const Profile = () => {

  const { user, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);

  const logAccessToken = async (event) => {
    console.log(await getAccessTokenSilently());
  }

  const logIdToken = async(event) => {
    console.log(await getIdTokenClaims());
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
        <Button onClick={logAccessToken}>
          Access Token
        </Button>
        <Button onClick={logIdToken}>
          Id Token
        </Button>
      </Grid>
    </Grid>
  );  
};

export default Profile;
