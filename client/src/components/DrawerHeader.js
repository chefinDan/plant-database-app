import React from 'react'; 
import { makeStyles, Typography } from "@material-ui/core";
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
    styles:{
        backgroundColor: theme.palette.grey[100],
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }
}));

const DrawerHeader = (props) => {
    const classes = useStyles();
    const { user } = useAuth0();
    const { children } = props; 
    
    return(
        <div className={classes.styles}>
            {children}
            {<Typography variant='body2'>{ user.name.split('@')[0] }</Typography>}
        </div>
    );
}

export default DrawerHeader;