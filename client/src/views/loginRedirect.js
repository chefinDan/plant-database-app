import React, { useEffect, useState } from "react";
import AWS from 'aws-sdk';
import { useAuth0 } from "@auth0/auth0-react";
import Highlight from "../components/highlight";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import Loading from "../components/loading";
import { useRouteMatch } from "react-router-dom";


const LoginRedirect = () => {

  const [ idToken, setIdToken ] = useState();
  const { isLoading, getIdTokenClaims } = useAuth0();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);

  useEffect(() => {
    (async () => {
      const id_token = await getIdTokenClaims();
      var logins = {};
      const provider_url = process.env.REACT_APP_AUTH0_DOMAIN;
      logins[provider_url] = id_token.__raw;
      AWS.config.region = process.env.REACT_APP_REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        Logins: logins
      });
      setIdToken(id_token);
    })();
  },[]);
  
  if(isLoading){
    return (
      <Loading />
      );
  }
  return (
    <Box >
        <Typography variant='h3'>Returned from login</Typography>
        <Highlight >{JSON.stringify(idToken, null, 2)}</Highlight>
    </Box>
  );  
};

export default LoginRedirect;
