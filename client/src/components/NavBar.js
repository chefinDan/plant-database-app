import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles, styled } from '@material-ui/core/styles';
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
      flexGrow: 1
    },
  }
));

const LogoImg = styled('img')({
  height: '30px',
})


export const NavBar = () => {
  const classes = useStyles();
  return (
    <Box component='nav'>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton}>
            <Menu />
          </IconButton>
          <Typography variant='h6' className={classes.appBarTitle}>
            Portfolio
          </Typography>
          <IconButton>
            <LogoImg src={logoUrl} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Box>
  )
}