import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

import "./App.css";
import Footer from "./Footer";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

// import { useParams } from 'react-router-dom';

export default function App() {
  const [cart, setCart] = useState(()=>{
    try{
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("THe cart could not be parsed into JSON");
      return [];
    }
  });



  useEffect(()=> localStorage.setItem("cart", JSON.stringify(cart)), [cart])

  function addToCart (id, sku) {
    setCart((prevState) => {
      const itemInCart = prevState.find((i)=> i.sku === sku);
      if (itemInCart){
        return prevState.map((i)=> i.sku === sku ? {...i, quantity: i.quantity+1 }:i);
      } else {
        return [...prevState, {id, sku, quantity:1}]
      }
    })
  }
  
  function updateQuantity(sku, quantity){
    setCart((prevState)=>{
      if (quantity === 0){
        return (prevState.filter((i) => i.sku !== sku))
      }
      return prevState.map((i)=>i.sku === sku ? {...i, quantity}:i)
    })
  }

  function emptyCart() {
    setCart([])
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>}/>
            <Route path='/:category' element={<Products/>}/>
            <Route path='/:category/:id' element={<Detail addToCart={addToCart}/>}/> 
            <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity}/>}/>
            <Route path='/checkout' element={<Checkout cart={cart} emptyCart={emptyCart}/>}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
