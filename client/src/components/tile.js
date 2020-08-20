import React, { useEffect, useState } from 'react';
import { GridListTile, GridListTileBar, Tooltip, IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const useStyles = makeStyles({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export default function Tile(props){
  const classes = useStyles();
  const {id, image_url, common_name, scientific_name, clicked} = props;
  const {getAccessTokenSilently} = useAuth0();
  const [fullDetails, setFullDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(clicked === true){
      (async () => {
        setIsLoading(true); 
        const accessToken = await getAccessTokenSilently();
        const url = `/api/plants/search?id=${id}`;
        try{
          const res = await fetch(url,{
            headers:{
              Authorization: `Bearer ${accessToken}`
            }
          });
          const result = await res.json();
          setFullDetails(result.data);
          setIsLoading(false);
        }
        catch(e){
          console.log(e);
        }
      })();
    }
  },[clicked])

  return(
    isLoading ? <img src={loading} alt='loading' style={{ paddingTop: '20px', padingLeft: '20px'}}/> :
    <>
      <img src={image_url} alt={common_name}/>
      <GridListTileBar
        title={scientific_name}
        subtitle={clicked ? <span>Common: {common_name}, family: {fullDetails?.main_species?.family}</span> : null}
        actionIcon={
          <Tooltip title={`Info about ${scientific_name} ${common_name ? `aka ${common_name}` : ``}`}>
            <IconButton component={Link} className={classes.icon} to={`/search?id=${id}`}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        }
      />
    </>
  )
}