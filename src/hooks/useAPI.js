import { useState, useLayoutEffect } from "react";
import axios from "axios";

const useAPI = ({ apiURL }) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiURL]);

  return { posts, isLoading, error };
};

export default useAPI;
