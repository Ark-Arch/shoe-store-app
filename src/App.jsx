import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'

import "./App.css";
import Footer from "./Footer";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';

import { useParams } from 'react-router-dom';

export default function App() {
  const [cart, setCart] = useState([]);

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
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
