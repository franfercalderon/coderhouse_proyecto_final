//Imports elements from react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Imports views
import Home from './views/Home/Home'
import Category from './views/Category/Category'
import Product from './views/Product/Product'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path='*' element={<Home/>} />
        <Route exact path='/category/:categoryId' element={<Category/>} />
        <Route exact path='/product/:productId' element={<Product/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
