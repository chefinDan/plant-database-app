import React, { useEffect, useState, useCallback } from 'react'
import { Typography, Container, GridList, useMediaQuery, useTheme, Tooltip, GridListTile } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/loading';
import Tile from '../components/tile';

const SearchResults = () => {
  const { url, path } = useRouteMatch();
  const theme = useTheme();
  const gtSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const {getAccessTokenSilently} = useAuth0();
  const [results, setResults] = useState();

  const querySearch = async (query) => {
    const accessToken = await getAccessTokenSilently();
    const url = `/api/plants/search?${query}`;
    try{
      const res = await fetch(url,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
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
    const query = Object.keys(parsed).map(k => (`${k}=${parsed[k]}`)).join('&');
    querySearch(query);
  },[]);

  
  return (
    <div>
      <Typography variant="h2" color="initial">Search Results</Typography>
      <Container>
        {
          results !== undefined ?
            results.data.length > 1 ?
              <GridList cellHeight={180} cols={gtSmall ? 3 : 2}>
                {results.data.map((d, i) => (
                  <GridListTile key={i}>
                    <Tile {...d} />
                  </GridListTile>
                ))}
              </GridList> 
            : JSON.stringify(results.data) 
          : <Loading />
        }
      </Container>
    </div>
  )
}

export default SearchResults;