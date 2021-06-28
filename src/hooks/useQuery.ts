import { useEffect, useState } from "react";

export const useQuery = (fetchFunction: () => Promise<any>) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFunction().then(setData).catch(setError);
    setisLoading(false);
  }, [fetchFunction]);

  return { data, isLoading, error };
};
