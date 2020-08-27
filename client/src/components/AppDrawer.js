import React from 'react';
import DrawerHeader from './DrawerHeader';
import { makeStyles, Divider, List, ListItem, ListItemIcon, ListItemText, Drawer, Box, IconButton } from '@material-ui/core';
import ProfileBadge from './ProfileBadge';
import { useRouteMatch, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './loading';
import LogoutButton from './logout-button';
import { ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  badgeWrapper:{
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    justifyContent: 'center',
  },
  drawer:{
    width: '240px'
  },
  link:{
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  listItem: {
    paddingRight: '60px'
  }
}));

const AppDrawer = ({open, onCloseHandler, items, icons, colors}) => {
  const classes = useStyles();
  const {isLoading, isAuthenticated, user, logout} = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  }

  return(
    <Drawer 
      anchor='left' 
      open={open}
      onClose={() => onCloseHandler()} 
      className={classes.drawer}
    >
      <DrawerHeader onClick={() => onCloseHandler()}>
        <Box className={classes.badgeWrapper}>
          {isLoading && <Loading />}
          {isAuthenticated && <ProfileBadge name={user.name}/>}
        </Box>
      </DrawerHeader>
      <Divider /> 
      <List>
        {items.map((text, i) => (
          <React.Fragment key={i}>
            {text === 'Settings' ? <Divider /> : null}
            <NavLink to={`/${text.toLowerCase()}`} className={classes.link} onClick={() => onCloseHandler()}>
              <ListItem button key={i} className={classes.listItem}>
                <ListItemIcon style={{minWidth: '35px'}}>
                  {(() => {
                    let Icon = icons[text]
                    return <Icon style={{ color: colors[text] }}/>
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} primaryTypographyProps={{variant: 'body2'}}/>
              </ListItem>
            </NavLink>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}


export default AppDrawer;