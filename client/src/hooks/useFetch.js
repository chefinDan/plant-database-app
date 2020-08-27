import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const {getAccessTokenSilently} = useAuth0();

  const protectedFetch = async (url, options) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {
        ...options,
        headers:{
          ...options.headers,
          Authorization: `Bearer: ${token}`
        }
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  }
  
  return { protectedFetch, response, error };
};

export default useFetch;