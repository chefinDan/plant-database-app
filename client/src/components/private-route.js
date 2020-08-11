import React from "react";
import { Route, Link } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading  from "./loading";
import history from '../history';

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={
      withAuthenticationRequired(component, {
        onRedirecting: () => {
          history.replace('/');
          return (
            <Loading />
          );
        },
      })
    }
    {...args}
  />
);

export default PrivateRoute;