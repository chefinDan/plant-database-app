import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import Scroller from "../components/Scroller";


const Collection = () => {

  const { user, isLoading } = useAuth0();
  
  if(isLoading){
    return (
      <Loading />
      );
  }

  return (
    <Scroller />
  );
};

export default Collection;
