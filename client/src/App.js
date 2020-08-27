import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Home from './views/home';
import Profile from './views/profile';
import LoginRedirect from './views/loginRedirect'; 
import PrivateRoute from './components/private-route';
import Collection from './views/collection';
import FloatingActionButton from './components/Fab';
import Settings from './views/settings';
import Search from './views/search';

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
      <NavBar /> 
      <Switch>
        <PrivateRoute
          path='/redirect' exact
          component={LoginRedirect}
        />
        <PrivateRoute 
          path='/profile' exact 
          component={Profile}
        />
        <PrivateRoute
          path='/collection' exact
          component={Collection}
        />
        <PrivateRoute
          path='/search' exact
          component={Search}
        />
        <PrivateRoute
          path='/settings' exact
          component={Settings}
        />
        <Route 
          path='/'
          component={Home}
        />
        <Route 
          path='*'
          component={() => (
            <Typography variant='h3'>404</Typography>
          )}
        />
      </Switch>
      <FloatingActionButton />
    </div>
  );
}

export default App;
