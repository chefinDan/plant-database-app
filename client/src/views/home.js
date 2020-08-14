import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom';

const Home = () => {
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);
  
  return (
    <div>
      <Typography variant="h1" color="initial">Home Page</Typography>
    </div>
  )
}

export default Home