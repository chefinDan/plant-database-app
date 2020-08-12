import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box,
  IconButton,
  Grid,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import logoUrl from '../static/monstera.png';
import { Link } from 'react-router-dom';
import theme from '../theme';
import ProfileBadge from './ProfileBadge';
import DrawerHeader from './DrawerHeader';
import Loading from './loading';


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
    badgeWrapper:{
      // marginLeft: '10px',
      marginRight: '20px'
    }
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

export const NavBar = ({items, icons, colors}) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth0(); 
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(s => !s);
  };


  const DrawerContent = () => (
    <>
      <DrawerHeader onClick={toggleDrawer}>
        <div className={classes.badgeWrapper}>
          <ProfileBadge />
        </div>
      </DrawerHeader>
      <Divider /> 
      <List>
        {items.map((text, i) => (
          <React.Fragment key={i}>
            {text === 'Settings' ? <Divider /> : null}
            <ListItem button key={i} style={{paddingRight:'60px'}}>
              <ListItemIcon >
                {(() => {
                  let Icon = icons[text]
                  return <Icon style={{ color: colors[text] }}/>
                })()}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{variant: 'body2'}}/>
            </ListItem>
            </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <Box component='nav'>
    <HideOnScroll>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar >
          <Grid container justify='space-between' alignItems='center'>
            {
              isAuthenticated ? 
                <Grid item xs>
                  <IconButton edge='start' className={classes.menuButton} onClick={toggleDrawer(true)}>
                    <Menu />
                  </IconButton>
                </Grid>
              : null
            }
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
      { 
        isAuthenticated ? 
          <Drawer 
            anchor='left' 
            open={drawer} 
            onClose={toggleDrawer(false)} 
            className={classes.drawer}
          >
            <DrawerContent />
          </Drawer>
        : null
      }
    </Box>
  )
}


export default NavBar;
