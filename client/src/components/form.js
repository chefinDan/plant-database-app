import React, { useEffect, useState, useCallback } from 'react';
import { TextField, Box, Typography, Input, Button, makeStyles } from '@material-ui/core';
import FileUpload from './fileUpload';
import useFileUpload from '../hooks/useFileUpload';

const useStyles = makeStyles(theme => ({
  thumbnail: {
      flexBasis: '100px',
      height: '100%',
      maxWidth: '50px',
      maxHeight: '50px',
      objectFit: 'cover',
  },
  thumbnailWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 4px'
  }
}));

const MultiFileInput = (props) => {
  const {children, onChange} = props;
  return(
    <Input 
      type='file' 
      onChange={onChange}
      disableUnderline={true} 
      inputProps={{accept: 'image/*', multiple:true}} 
      color='secondary' 
      style={{paddingBottom: '2rem'}}
    >
      {children}
    </Input>
  )
}

const useForm = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
    category: '',
  });
  // const { uploadSuccess } = props;
  // const {
  //   files,
  //   uploaded,
  //   status,
  //   onSubmit: uploadFiles,
  //   onChange: fileInputChange,
  // } = useFileUpload();

  // useEffect(() => {
  //   if(status === 'FILES_UPLOADED'){
  //     uploadSuccess(uploaded);
  //   }
  // },[status]);

  const handleChange = (key) => ({target:{value}}) => {
    setState(state => ({
      ...state,
      [key]: value
    }));
  }

  const classes = useStyles();
  
  const onSubmit = () => {
    //TODO: validate and sanitize input
    console.log(`Submitting: `, state);
  }

  const Form = () => (
    <Box >
      <form>
        <TextField
          fullWidth 
          label="Name" 
          value={state.name}
          onChange={handleChange('name')}
        />
        <br />
        <TextField
          fullWidth  
          label="Description"
          value={state.description} 
          onChange={handleChange('description')}
        />
        <br />
        <TextField 
          fullWidth
          label="Category" 
          value={state.category}
          onChange={handleChange('category')}
        />
          {/* {status === 'FILES_UPLOADED' && (
          <Box className="success-container">
            <Box>
              <Typography variant="h2">Congratulations!</Typography>
              <small>You uploaded your files. Get some rest.</small>
            </Box>
          </Box>
          )} */}
        {/* <Box>
          <MultiFileInput onChange={fileInputChange}/>
          <Button type="submit">Submit</Button>
        </Box> */}
        {/* <Box>
          {files.map(({ file, src, id }, index) => (
            <Box
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className={classes.thumbnailWrapper}
            >
              <img className={classes.thumbnail} src={src} alt="" object-fit='cover'/>
              <Box className="thumbnail-caption">{file.name}</Box>
            </Box>
          ))}
        </Box> */}
      </form>
    </Box>
  )
  
  return {
    ...state,
    Form,
    onSubmit
  }
}

export default useForm;