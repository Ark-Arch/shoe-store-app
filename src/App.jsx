import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts }  from "./services/productService";
import Spinner from './Spinner'


export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  // handling async code error
  const [error, setError] = useState(null);
  // handling slow api call
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
          const response = await getProducts("shoes")
          setProducts(response)
      } catch(error){
          setError(error) // for async code error
      } finally{setLoading(false)}; // for setting loading
    };
    init();
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  //function to toggle size
  const toggleSize = (e) => {
    setSize(e.target.value)
  }

  const filteredProducts = size ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;


  if(error) throw error;

  if (loading) return <Spinner/>

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={toggleSize}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            { size && <h2>Found {filteredProducts.length} items</h2> }
          </section>
          <section id="products">
            {
              filteredProducts.map(renderProduct)
            }
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
