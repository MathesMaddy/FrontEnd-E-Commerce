import { useState } from 'react'
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import CartPage from './components/CartPage'


function App() {

  const [addToCart, setAddToCart] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element = {<LoginPage />}/>
          <Route path = '/dashboard' element = {<DashBoard addToCart = {addToCart} setAddToCart ={setAddToCart} />}/>
          <Route path = '/cart' element = {<CartPage addToCart = {addToCart} setAddToCart ={setAddToCart} />} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
