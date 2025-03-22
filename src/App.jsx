import {Routes, Route} from 'react-router-dom'

import "./App.css";
import Footer from "./Footer";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';

export default function App() {

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>}/>
            <Route path='/:category' element={<Products/>}/>
            <Route path='/:category/:id' element={<Detail/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
