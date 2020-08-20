import React, { useState } from 'react';
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
import { Menu } from '@material-ui/icons';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import Loading from './loading';
import AppDrawer from './AppDrawer';
import data from '../data';

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
    },
    list:{
      width:'auto'
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

export const NavBar = ({title=''}) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0(); 

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
            {
              isAuthenticated ? 
                <Grid item>
                  <IconButton edge='start' className={classes.menuButton} onClick={toggleDrawer}>
                    <Menu />
                  </IconButton>
                </Grid>
              : null
            }
            <Grid item>
              <Typography variant='h6' className={classes.appBarTitle}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justify='flex-end'>
                <Grid item>
                  {
                    isLoading ? <Loading /> 
                    : isAuthenticated ? <LogoutButton /> 
                      : <> <LoginButton /> <SignupButton /> </>}
                </Grid>
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
