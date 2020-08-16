import React from 'react';
import { TextField } from '@material-ui/core';

export default function Form(props){
  return(
    <form noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </form>
  );
}