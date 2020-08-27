import React from 'react'
import useFileUpload from '../hooks/useFileUpload';
import { makeStyles, Box, FormControl, Button, Typography, Input } from '@material-ui/core';

const bucketName = 'green-house-dev';

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

const FileUpload = () => {
  const {
    files,
    uploaded,
    status,
    onSubmit,
    onChange: fileInputChange,
  } = useFileUpload();

  const classes = useStyles();

  return (
    <Box >
      <form onSubmit={onSubmit}>
        {status === 'FILES_UPLOADED' && (
          <Box className="success-container">
            <Box>
              <Typography variant="h2">Congratulations!</Typography>
              <small>You uploaded your files. Get some rest.</small>
            </Box>
          </Box>
        )}
        <Box>
          <MultiFileInput onChange={fileInputChange}/>
          <Button type="submit">Submit</Button>
        </Box>
        <Box>
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
        </Box>
      </form>
    </Box>
  )
}

export default FileUpload;