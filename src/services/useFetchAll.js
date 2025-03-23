import { useState, useRef, useEffect } from "react";

export default function useFetchAll(urls) {
  const prevUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run if the array of URLs passed in changes
    if (areEqual(prevUrls.current, urls)) return;

    prevUrls.current = urls;

    console.log(urls)
    const promises = urls.map((url) =>
      fetch(url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );
    console.log(promises)
    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { data, loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
