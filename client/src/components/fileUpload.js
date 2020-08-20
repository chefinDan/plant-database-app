import React from 'react'
import useFileUpload from '../hooks/useFileUpload';
import { makeStyles } from '@material-ui/core';

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

const Input = (props) => (
  <input
    type="file"
    accept="image/*"
    name="img-loader-input"
    multiple
    {...props}
  />
)

const FileUpload = () => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useFileUpload();

  const classes = useStyles();

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        {status === 'FILES_UPLOADED' && (
          <div className="success-container">
            <div>
              <h2>Congratulations!</h2>
              <small>You uploaded your files. Get some rest.</small>
            </div>
          </div>
        )}
        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>
        <div>
          {files.map(({ file, src, id }, index) => (
            <div
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className={classes.thumbnailWrapper}
            >
              <img className={classes.thumbnail} src={src} alt="" object-fit='cover'/>
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default FileUpload;