import AWS from 'aws-sdk';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
const bucketName = 'green-house-dev';

const useS3 = () => {
  const { isLoading, getIdTokenClaims } = useAuth0();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      var logins = {};
      const provider_url = process.env.REACT_APP_AUTH0_DOMAIN;
      AWS.config.region = process.env.REACT_APP_REGION;

      const id_token = await getIdTokenClaims();
      logins[provider_url] = id_token.__raw;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        Logins: logins
      });
      setState(state => ({...state, idToken: id_token.__raw}));
    })();
  },[]);

  const upload = async (key, dataPromise, meta) => {
    // blob type data returns a promise when a convert method is called on it,
    // the blob should have its convert method called and then pass the promise as a parameter 
    const data = await dataPromise; 
    return new Promise(async (resolve, reject) => {
      const params = {
        Bucket: bucketName, 
        Key: key, Body: data
      };
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
  }

  return {
    upload
  }
}

export default useS3;