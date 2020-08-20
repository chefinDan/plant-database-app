import React, { useEffect, useState, useCallback } from 'react'
import { Typography, Container, GridList, useMediaQuery, useTheme, Tooltip, GridListTile } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/loading';
import Tile from '../components/tile';
import Details from '../components/detailedTile';

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
      const result = await res.json();
      console.log(result);
      setResults(result.data.map(d => ({clicked: false, ...d})));
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

  const handleTileClick = (id) => {
    setResults(state => {
      const idx = state.findIndex(el => el.id === id);
      console.log(idx);
      state[idx].clicked = !state[idx].clicked;
      return [...state];
    });
    // alert('tile clicked')
  } 

  
  return (
    <div>
      <Container>
        <Typography variant="h2" color="initial">Search Results</Typography>
        {
          results !== undefined ? (
            results.length > 1 ? (
              <GridList cellHeight={180} cols={4}>
                {results.map((d, i) => (
                  <GridListTile 
                    key={i}
                    cols={gtSmall ? (d.clicked ? 2 : 1) : (d.clicked ? 4 : 2)}
                    rows={gtSmall ? (d.clicked ? 2 : 1) : (d.clicked ? 2 : 1)}  
                    onClick={() => handleTileClick(d.id)}
                  >
                    <Tile {...d} />
                  </GridListTile>
                ))}
              </GridList>
            ) : ( 
              null // <Details data={results.data}/>
            )
          ) : (
            <Loading />
          )
        }
      </Container>
    </div>
  )
}

export default SearchResults;