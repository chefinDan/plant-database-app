import React, { useState, useEffect, useRef } from 'react';
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
import { Menu, MoreVert, Search } from '@material-ui/icons';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import Loading from './loading';
import AppDrawer from './AppDrawer';
import data from '../data';
import { useHistory } from 'react-router-dom';
import SearchInput from './searchInput';

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

export default function NavBar(){
  const [drawer, setDrawer] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [title, setTitle] = useState(getCurrentBasePath());
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0();
  const history = useHistory()
  const node = useRef();

  const handleClickOutside = e => {
    console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setSearchBar(false);
  };

  useEffect(() => {
    history.listen(() => {
      setTitle(getCurrentBasePath());
    });
  },[]);

  useEffect(() => {
    if(searchBar){
      document.addEventListener('mousedown', handleClickOutside);
    }
    else{
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBar]);

  const toggleDrawer = () => {
    setDrawer(s => !s);
  };

  const toggleSearchBar = () => {
    setSearchBar(true);
  }

  const {nav: { drawer: drawerData }} = data

  return (
    <div ref={node}>
      <AppDrawer open={drawer} onCloseHandler={toggleDrawer} {...drawerData}/>
      <Box component='nav'>
        <HideOnScroll>
          <AppBar position='fixed' className={classes.appBar}>
            <Toolbar >
              <Grid container justify='space-between' alignItems='center'>
            
              {/* Left side of navbar */}
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
                  {
                    !searchBar && 
                    <Grid item>
                      <Typography variant='h6' className={classes.appBarTitle} >
                        {title}
                      </Typography>
                    </Grid>
                  }
                </Grid>
              </Grid>

              {/* Right side of navbar */}
              {
                !searchBar && 
                <Grid item>
                  <Grid container justify='flex-end' alignItems='center'>
                    <Grid item>
                      {
                        isLoading ? <Loading /> 
                        : isAuthenticated ? null : <> <LoginButton /> <SignupButton /> </>
                      }
                    </Grid>
                    {
                      isAuthenticated &&
                      <Grid item>
                        <IconButton onClick={toggleSearchBar}>
                          <Search />
                        </IconButton>
                      </Grid>
                    }
                    {
                      isAuthenticated &&
                      <Grid item>
                        <MoreVert />
                      </Grid>
                    }
                  </Grid>
                </Grid>
              }
              {
                searchBar &&
                <SearchInput />
              }
            </Grid>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <div className={classes.offset} />
      </Box>
    </div>
  )
}