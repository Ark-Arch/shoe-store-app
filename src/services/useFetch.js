import {useState, useEffect} from 'react'
const baseUrl = process.env.REACT_APP_API_BASE_URL;
console.log(`baseUrl:${baseUrl}`)

export default function useFetch (url){
      const finalUrl = baseUrl + url

      const [data, setData] = useState(null);
      // handling async code error
      const [error, setError] = useState(null);
      // handling slow api call
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        async function init() {
          try {
              console.log(finalUrl)
              const response = await fetch(finalUrl);
              if (response.ok) {
                const json = await response.json()
                setData(json)
              } else{
                throw(response)
              }
          } catch(error){
              setError(error) // for async code error
          } finally{setLoading(false)}; // for setting loading
        };
        init();
      }, [finalUrl]);
      
      return { data, error, loading }
}