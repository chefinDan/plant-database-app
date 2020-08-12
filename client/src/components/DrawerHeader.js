import React from 'react'; 
import { makeStyles, Typography } from "@material-ui/core";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    styles:{
        backgroundColor: theme.palette.grey[100],
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    link:{
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));

const DrawerHeader = (props) => {
    const classes = useStyles();
    const { user } = useAuth0();
    const { children } = props; 
    
    return(
        <Link to='/profile' className={classes.link} onClick={props.onClick(false)}>
            <div className={classes.styles}>
                {children}
                {<Typography variant='body2'>{ user.name.split('@')[0] }</Typography>}
            </div>
        </Link>
    );
}

export default DrawerHeader;