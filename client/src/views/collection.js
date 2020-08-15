import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import Scroller from "../components/Scroller";
import { Typography, Container, Button } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
const testUrl = 'https://jsonplaceholder.typicode.com/photos';


const Collection = () => {
  const { user, isLoading } = useAuth0(true);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);

  useEffect(() => {
    getPhotos(page);
  }, [page]);
  
  const getPhotos = async (page) => {
    setLoading(true);
    const res = await fetch(testUrl + `?_page=${page}&_limit=12`);
    const data = await res.json();
    setPhotos(state => [...state, ...data]);
    setLoading(false);
  }
  
  if(isLoading){
    return (
      <Loading />
      );
  }

  return (
    <>
      <Scroller photos={photos} />
      <Button onClick={e => setPage(page => page+1)}>Load More</Button>
    </>
    );
};

export default Collection;
