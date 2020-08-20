import React from 'react';
import { GridListTile, GridListTileBar, Tooltip, IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export default function DetailedTile(props){
  const classes = useStyles();
  const {id, image_url, common_name, scientific_name, handleClick} = props;

  return(
    <>
      <img src={image_url} alt={common_name}/>
      <GridListTileBar
        title={scientific_name}
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