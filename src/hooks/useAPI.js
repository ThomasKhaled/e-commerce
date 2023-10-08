import { useState, useEffect } from "react";
import axios from "axios";

const useAPI = ({ apiURL, searchTerm }) => {
  const [posts, setPosts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        const filteredProducts = response.data.filter((product) =>
          product.title.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filteredProducts);
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiURL, searchTerm]);

  return { posts, isLoading, error, filteredProducts };
};

export default useAPI;
