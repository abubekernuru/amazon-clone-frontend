import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/Auth/SignUp'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/auth" element={<SignUp />}></Route>
            <Route path="/payments" element={<Payment />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/product/:id" element={<ProductDetail />} /> 
            <Route path="/results" element={<Results />} /> 
        </Routes>
    </Router>
  )
}

export default Routing
