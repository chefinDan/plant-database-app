import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Typography, Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavBar } from './components/NavBar';
import Testing from './views/testing';
import Profile from './views/profile';
import PrivateRoute from './components/private-route';
import { Collections } from '@material-ui/icons';
import Collection from './views/collection';
import data from './data';

const {nav: { drawer: drawerData }} = data

const useStyles = makeStyles(theme => ({
  root: {
  },
  main:{
  },
  headerBorder:{
    border: 'solid 1px white'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar {...drawerData}/>
        <Grid container>
        <Switch>
          <Route exact path='/' component={Testing} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/collection' component={Collection} />
          <Route path='*'>
            <Typography variant='h3'>404</Typography>
          </Route>
        </Switch>
        </Grid>
    </div>
  );
}

export default App;
