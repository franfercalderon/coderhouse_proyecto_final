//Imports elements from react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Import Context
import {CartProvider} from './context/CartContext/CartContext'


//Imports views
import Home from './views/Home/Home'
import Category from './views/Category/Category'
import Product from './views/Product/Product'
import Cart from './views/Cart/Cart'
import Checkout from './views/Checkout/Checkout'

function App() {

  return (

    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/category/:categoryId' element={<Category/>} />
          <Route exact path='/product/:productId' element={<Product/>} />
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/checkout' element={<Checkout/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>

  );
}

export default App;
