import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box,
  IconButton,
  Grid,
  useScrollTrigger,
  Slide,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MoreVert } from '@material-ui/icons';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import Loading from './loading';
import AppDrawer from './AppDrawer';
import data from '../data';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => (
  {
    menuButton:{
      marginRight: theme.spacing(2) 
    },
    appBar:{
      backgroundColor: theme.palette.grey[100],
    },
    offset: {
      marginBottom: '20px',
      ...theme.mixins.toolbar
    },
    appBarTitle:{
      color: theme.palette.text.primary,
    },
  }
));

function HideOnScroll({children}) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const getCurrentBasePath = () => {
  let path = window.location.pathname.split('/')[1];
  let loc = path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Home';
  return loc;
}

export const NavBar = () => {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('');
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0();
  const history = useHistory()

  useEffect(() => {
    setTitle(getCurrentBasePath());    
    history.listen(() => {
      setTitle(getCurrentBasePath());
    });
  },[]);

  const toggleDrawer = () => {
    setDrawer(s => !s);
  };

  const {nav: { drawer: drawerData }} = data

  return (
    <>
    <Box component='nav'>
    <HideOnScroll>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar >
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Grid container alignItems='center'>
                {
                  isAuthenticated &&
                  <Grid item>
                    <IconButton edge='start' className={classes.menuButton} onClick={toggleDrawer}>
                      <Menu />
                    </IconButton>
                  </Grid>
                }
                <Grid item>
                  <Typography variant='h6' className={classes.appBarTitle} >
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container justify='flex-end'>
                <Grid item>
                  {
                    isLoading ? <Loading /> 
                    : isAuthenticated ? null : <> <LoginButton /> <SignupButton /> </>
                  }
                </Grid>
                {
                  isAuthenticated &&
                  <Grid item>
                    <MoreVert />
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </Box>
    <AppDrawer open={drawer} onCloseHandler={toggleDrawer} {...drawerData}/>
    </>
  )
}

export default NavBar;
