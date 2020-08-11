import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton,
  Grid,
  Container,
  useScrollTrigger,
  Slide
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles, styled } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import logoUrl from '../static/monstera.png';
import { Link } from 'react-router-dom';
import theme from '../theme';

const useStyles = makeStyles(theme => (
  {
    logo: {
      margin: '0 auto',
      height: '50px',
      width: '50px',
      border: 'solid 5px white',
    },
    header:{
      paddingTop: '35px',
    },
    pageLink:{
      textDecoration: 'none', 
      color:'black',
    },
    pageLinkText:{
      fontWeight:'300'
    },
    line:{
      maxWidth: '3.1rem',
      backgroundColor: 'grey',
    },
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
    flexgrow:{
      flexGrow: 1
    }
  }
));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AppBarLink = styled(Link)({
  color: theme.palette.text.primary,
  textDecoration: 'none'
});


export const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0(); 

  return (
    <Box component='nav'>
    <HideOnScroll>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar >
          <Grid container justify='space-between' alignItems='center'>
            <Grid item xs={8}>
              <Grid container alignItems='center' spacing={3}>
                <Grid item>
                  <IconButton edge='start' className={classes.menuButton}>
                    <Menu />
                  </IconButton>
                </Grid>
                <Grid item>
                  <AppBarLink to='/profile'>
                    <Typography variant='h6' >
                      Profile
                    </Typography>
                  </AppBarLink>
                </Grid>
                <Grid item>
                  <AppBarLink to='/collection' className={classes.flexgrow}>
                    <Typography variant='h6' >
                      Collection
                    </Typography>
                  </AppBarLink>
                </Grid> 
              </Grid>
            </Grid>
            <Grid item xs={4} >
              <Grid container justify='flex-end'>
                <Grid item>
                  {isAuthenticated ? <LogoutButton /> : <> <LoginButton /> <SignupButton /> </>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </Box>
  )
}


export default NavBar;
