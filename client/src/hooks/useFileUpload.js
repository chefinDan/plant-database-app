// Based on code from https://jsmanifest.com/uploading-files-in-react-while-keeping-ui-completely-in-sync/

import { useCallback, useEffect, useReducer, useRef } from 'react'
import AWS from 'aws-sdk';
import { useS3 } from './useS3';

const bucketName = 'green-house-dev'; 

const api = {
  uploadFile({file}) {
    console.log(file)
    return new Promise(async (resolve, reject) => {
      var params = {
        Bucket: bucketName, 
        Key: file.name, Body: await file.arrayBuffer()};
      try{
        AWS.config.credentials.get(err => {
          if(err){
            console.log('Error in getting credentials', err);
            reject(err);
          }
          else{
            const s3 = new AWS.S3();
            s3.putObject(params, (err, data) => {
              if(err) reject(err);
              else resolve(data);
            });
          }
        })
      }      
      catch(err){
        reject(err);
      }
    })
  },
}

const logUploadedFile = (num, color = 'green') => {
  const msg = `%cUploaded ${num} files.`
  const style = `color:${color};font-weight:bold;`
  console.log(msg, style)
}

// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, files: action.files, status: LOADED }
    case 'submit':
      return { ...state, uploading: true, pending: state.files, status: INIT }
    case 'next':
      return {
        ...state,
        next: action.next,
        status: PENDING,
      }
    case 'file-uploaded':
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      }
    case 'files-uploaded':
      return { ...state, uploading: false, status: FILES_UPLOADED }
    case 'set-upload-error':
      return { ...state, uploadError: action.error, status: UPLOAD_ERROR }
    default:
      return state
  }
}

const useFileUpload = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const{ upload } = useS3();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (state.files.length) {
        dispatch({ type: 'submit' })
      } else {
        window.alert("You don't have any files loaded.")
      }
    },
    [state.files.length],
  )

  const onChange = (e) => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files)
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file)
        return { file, id: index, src }
      })
      dispatch({ type: 'load', files })
    }
  }

  // Sets the next file when it detects that its ready to go
  useEffect(() => {
    if (state.pending.length && state.next == null) {
      const next = state.pending[0]
      dispatch({ type: 'next', next })
    }
  }, [state.next, state.pending])

  const countRef = useRef(0)

  // Processes the next pending thumbnail when ready
  useEffect(() => {
    if (state.pending.length && state.next) {
      const { next, bucket } = state
      const { file } = next;
      // file.arrayBuffer().then((data) => console.log(data)) 
      upload(file.name, file.arrayBuffer())
        .then(() => {
          const prev = next
          logUploadedFile(++countRef.current)
          const pending = state.pending.slice(1)
          dispatch({ type: 'file-uploaded', prev, pending })
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'set-upload-error', error })
        })
    }
  }, [state])

  // Ends the upload process
  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: 'files-uploaded' })
    }
  }, [state.pending.length, state.uploading])

  return {
    ...state,
    onSubmit,
    onChange,
  }
}

export default useFileUpload;