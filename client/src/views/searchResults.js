import React, { useEffect, useState } from 'react'
import { Typography, Container, GridList, GridListTile, GridListTileBar, IconButton, makeStyles } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import { useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/loading';

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

const SearchResults = () => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const {getAccessTokenSilently} = useAuth0();
  const [results, setResults] = useState();

  const querySearch = async (query) => {
    const accessToken = await getAccessTokenSilently();
    const url = `/api/plants/search?q=${query}`;
    try{
      const res = await fetch(url,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      console.log(data);  
      setResults(data);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`);
  },[url, path]);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    querySearch(parsed.q);
  },[]);

  const ResultsList = ({data}) => {
    return (
      <GridList cellHeight={180} cols={3}>
        {data.map((d, i) => (
        <GridListTile key={i}>
          <img src={d.image_url} alt={d.common_name}/>
          <GridListTileBar
              title={d.common_name}
              actionIcon={
              <IconButton aria-label={`info about ${d.common_name}`} className={classes.icon}>
                  <InfoIcon />
              </IconButton>
              }
          />
        </GridListTile>
        ))}
    </GridList>
    );
  }
  
  return (
    <div>
      <Typography variant="h1" color="initial">Search Results</Typography>
      <Container>
        {results !== undefined ? <ResultsList data={results.data} /> : <Loading />}
    </Container>
    </div>
  )
}

export default SearchResults;