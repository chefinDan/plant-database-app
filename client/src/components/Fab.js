import React, { useState } from 'react';
import { Fab, Grid, makeStyles, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme =>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5)
    }
}));

export default function FloatingActionButton({onCLick}){
  const classes = useStyles();
  const {getAccessTokenSilently} = useAuth0();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Find your plant in our massive database...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            onChange={(event) => setQuery(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Link to={`/search?q=${query}`}>
            <Button onClick={handleClose} color="primary">
              Search
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}