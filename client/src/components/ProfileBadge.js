import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const INITIALS_SIZE = '2.5rem'
const useStyles = makeStyles(theme => ({
  circle: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    height: INITIALS_SIZE,
    textAlign: 'center',
    width: INITIALS_SIZE,
    color: theme.palette.grey[100]
  },
  initials: {
    fontSize: `calc(${INITIALS_SIZE} / 2)`, /* 50% of parent */
    lineHeight: 1,
    position: 'relative',
    top: `calc(${INITIALS_SIZE} / 4)`  /* 25% of parent */
  },
  profileBadge:{
      display: 'block',
      height: '40px',
      width: '40px', 
      lineHeight: '50px',
      borderRadius: '30px',
      color: 'white',
      textAlign: 'center',
      fontSize: '1.4rem'
  }
}));

const getInitials = (fullName) => {
  const firstAndLast = fullName.split(' ');
  const initialString = firstAndLast[0][0] + firstAndLast[1][0]; 
  return initialString.toUpperCase();
}

export default function ProfileBadge(props){
  const { name } = props;
  const classes = useStyles();

  return(
    <Box className={classes.circle}>
      <span className={classes.initials} >
        {getInitials(name)}
      </span>
    </Box>

  );
}