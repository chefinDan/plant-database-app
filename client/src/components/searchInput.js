import React from 'react';
import Search from '@material-ui/icons/Search';
import { TextField, Input, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  searchIcon: {
    fontSize: 20,
    color: theme.palette.grey[500],
    marginRight: theme.spacing(1),
  },
  input:{
    flex: 1
  }
}))

const SearchIcon = (props) => {
  const classes = useStyles();
  return(
    <Search className={classes.searchIcon}/>
  );
}

export default function SearchInput(props){
  const classes = useStyles();
  const {handleChange} = props;

  return (
    <Input
      autoFocus
      placeholder="monstera..."
      margin="dense"
      id="searchField"
      fullWidth
      startAdornment={<SearchIcon />}
      onChange={(event) => handleChange(event.target.value)}
      className={classes.input}
    />
  );
};