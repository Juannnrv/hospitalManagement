import { useState, useEffect } from "react";
import Error429 from "../components/errorHandler";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [is429, setIs429] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching data from http://localhost:5000${url}`);
      try {
        const response = await fetch(`http://localhost:5000${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 429) {
          setIs429(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Data fetched successfully:", result);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (is429) {
    return { data: null, loading: false, error: <Error429 /> };
  }

  return { data, loading, error };
};

export default useFetch;
