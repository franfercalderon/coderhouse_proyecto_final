//Imports elements from react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Imports views
import Home from './views/Home/Home'
import Category from './views/Category/Category'
import Product from './views/Product/Product'
import Cart from './views/Cart/Cart'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/category/:categoryId' element={<Category/>} />
        <Route exact path='/product/:productId' element={<Product/>} />
        <Route exact path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
