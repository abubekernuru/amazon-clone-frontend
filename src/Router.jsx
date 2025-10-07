import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Category from './components/Category/Category';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/payments" element={
              <ProtectedRoute msg="You Must Be Logged In To Make A Payment" redirect="/payments">
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute msg="You Must Be Logged In To View Your Orders" redirect="/orders">
                <Elements stripe={stripePromise}>
                  <Orders />
              </Elements>
              </ProtectedRoute>
            } />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/results/:categoryName" element={<Results />} />
            <Route path="/results" element={<Results />} />
        </Routes>
    </Router>
  )
}

export default Routing