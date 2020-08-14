import React, { useState, useEffect } from 'react';
import DrawerHeader from './DrawerHeader';
import { makeStyles, Divider, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import ProfileBadge from './ProfileBadge';
import { Link, useRouteMatch, NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  badgeWrapper:{
    marginRight: '20px'
  },
  drawer:{
    width: '240px'
  },
  link:{
    textDecoration: 'none',
    color: theme.palette.text.primary
}
}));

const AppDrawer = ({open, onCloseHandler, items, icons, colors}) => {
  const classes = useStyles();
  const {url, path} = useRouteMatch();

  return(
    <Drawer 
      anchor='left' 
      open={open}
      onClose={() => onCloseHandler()} 
      className={classes.drawer}
    >
      <DrawerHeader onClick={() => onCloseHandler()}>
        <div className={classes.badgeWrapper}>
          <ProfileBadge />
        </div>
      </DrawerHeader>
      <Divider /> 
      <List>
        {items.map((text, i) => (
          <React.Fragment key={i}>
            {text === 'Settings' ? <Divider /> : null}
            <NavLink to={`/${text.toLowerCase()}`} className={classes.link} onClick={() => onCloseHandler()}>
              <ListItem button key={i} style={{paddingRight:'60px'}}>
                <ListItemIcon >
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