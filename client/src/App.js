import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, useRouteMatch, useHistory, Redirect } from 'react-router-dom';
import { Typography, Grid, CssBaseline, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavBar } from './components/NavBar';
import Home from './views/home';
import Profile from './views/profile';
import PrivateRoute from './components/private-route';
import Collection from './views/collection';
import SearchResults from './views/searchResults';
import FloatingActionButton from './components/Fab';

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
  const [title, setTitle] = useState('');
  const [collection, setCollection] = useState({photos: [], page: 0});

  const setNavBarTitle = (path) => {
    if(title !== path){
      setTitle(path.replace('/', ''));
    }
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar title={title} /> 
        <Switch>
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
            component={SearchResults}
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
