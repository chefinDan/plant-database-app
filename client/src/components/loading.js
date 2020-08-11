import React from "react";
import { styled } from "@material-ui/core";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Spinner = styled('div')({
    position: 'absolute',
    display: 'flex',
    'justify-content': 'center',
    height: '100vh',
    width: '100vw',
    'background-color': 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
});

const Loading = () => (
  <Spinner >
    <img src={loading} alt="Loading" />
  </Spinner>
);

export default Loading;