import React, { useState, useEffect } from 'react';
import { 
  Container, 
  GridList, 
  GridListTile, 
  GridListTileBar, 
  IconButton,
  Button 
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  container: {},
  loading: {
    height: "100px",
    margin: "30px"
  },
  loadingText: {
    display: props => props.loading ? "block" : "none"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const Scroller = ({photos}) => {
  const [loading, setLoading] = useState(false);
  


  const classes = useStyles({loading: loading});

  

  return(
    <Container>
      <GridList cellHeight={180} cols={3}>
        {photos.map((photo, idx) => (
          <GridListTile key={idx}>
              <img src={photo.url} alt={photo.title}/>
              <GridListTileBar
                title={photo.title}
                actionIcon={
                  <IconButton aria-label={`info about ${photo.title}`} className={classes.icon}>
                      <InfoIcon />
                  </IconButton>
                }
              />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}

export default Scroller;