import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect({redirectUri: 'http://localhost:3000/redirect'})}
    >
      Log In
    </Button>
  );
};

export default LoginButton;

// https://dev-8mo1bnr4.auth0.com/authorize?audience=https%3A%2F%2Fexpress.sample&client_id=0mlsfFlDLgFuWLDiGTLC3l6mZCcgG6uc&redirect_uri=%2Fredirect&scope=openid%20profile%20email&response_type=code&response_mode=query&state=UU5JMEpGZWZuMVY2clN%2BeXlMMVhMUnZndnB3T3RmVm5xVHNRNkkzUFJKdA%3D%3D&nonce=YUpYVjFzVEFPNmh%2BV3lNMUtuaEFqN3JCYy5FUmtVRkhmUXFnQUpXQjR0dA%3D%3D&code_challenge=5WrYQUHWtBHxonpiCjYKccj_bFmSwoyPHEiE3kZI_YQ&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4wLjAifQ%3D%3D
//https://dev-8mo1bnr4.auth0.com/u/login?state=g6Fo2SA2Mm53elpKY2t0Z3VXcXlWb1pfSWFSdE5QeWNUa21aT6N0aWTZIFJUVDRiaUZUMTZlajBzdl94VURnNkhRbnBFeUFVYnp4o2NpZNkgMG1sc2ZGbERMZ0Z1V0xEaUdUTEMzbDZtWkNjZ0c2dWM