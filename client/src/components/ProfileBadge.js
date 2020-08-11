import React from 'react';
import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
    profileBadge:{
        display: 'block',
        height: '40px',
        width: '40px',
        lineHeight: '42px',
        borderRadius: '30px',
        backgroundColor: theme.palette.success.main,
        color: 'white',
        textAlign: 'center',
        fontSize: '1.4rem'
    }
}));

const ProfileBadge = () => {
    const classes = useStyles();
    const {isAuthenticated, user} = useAuth0();
    return(
      <span className={classes.profileBadge} >
        {user.name[0].toUpperCase()}
      </span>
    );
}

export default ProfileBadge;