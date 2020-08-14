import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import url from 'url';

import * as serviceWorker from './serviceWorker';
import pkg from '../package.json';
import App from "./App";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import theme from './theme';

const siteURL = pkg.homepage;
const basename = siteURL ? url.parse(siteURL).pathname : '';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={basename}>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </ThemeProvider>
,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
