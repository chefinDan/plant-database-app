import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import Scroller from "../components/Scroller";
import { Typography, Container, Button } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
const testUrl = 'https://jsonplaceholder.typicode.com/photos';


const Collection = ({onRouteChange, onUnmount, state=[]}) => {
  const { user, isLoading } = useAuth0(true);
  const [photos, setPhotos] = useState(state);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);

  useEffect(() => {
    getPhotos(page);
    return () => {
      onUnmount(photos);
    }
  },[page]);
  
  const getPhotos = async (page) => {
    setLoading(true);
    const res = await fetch(testUrl + `?_page=${page}&_limit=12`);
    const data = await res.json();
    setPhotos(state => {
        return [...state, ...data];
    });
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
      <Button onClick={e => setPage(state => state+1)}>Load More</Button>
    </>
    );
};

export default Collection;
