import React from 'react';
import { Fab, Grid, makeStyles, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme =>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(15)
    }
}));

export default function AddPhotoButton(){
    const classes = useStyles();
    return(
        <Grid container justify='flex-end'>
            <Grid item xs={12} className={classes.fab}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
        
    );
}