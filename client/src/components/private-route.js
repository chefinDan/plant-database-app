import React from "react";
import { Route, Link } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading  from "./loading";

const PrivateRoute = ({ component, path, ...args }) => (
  <Route
    component={
      withAuthenticationRequired(component, 
      {
        onRedirecting: () => <Loading />,
        returnTo: path
      })
    }
    {...args}
  />
);

export default PrivateRoute;