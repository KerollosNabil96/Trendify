import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import AfterPayment from './components/AfterPayment/AfterPayment'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import Payment from './components/Payment/Payment'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ProductDetails from './components/ProductDetails/ProductDetails'
import  { Toaster } from 'react-hot-toast';
import { Offline } from "react-detect-offline";
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Children } from 'react';
import ContextCartProvider from './Context/ContextCart'

function App() {

  let router = createBrowserRouter([
    { path: '/', element: <Layout/>, children: [
      {index:true  , element: <Home/>},
      {path: 'cart' , element:<Cart/>},
      {path: 'products' , element:<Products/>},
      {path: 'categories' , element:<Categories/>},
      {path: '/cart/payment/:id' , element:<Payment/>},
      {path: '/allorders' , element:<AfterPayment/>},
      {path: 'signin', element: <SignIn />},
      { path: 'forgetPassword', element: <ForgetPassword/> },
      {path: 'signup' , element:<SignUp/>},
      {path: 'product-details/:id', element: <ProductDetails/> },
      {path : "*" , element :<NotFound/>}
    ]}
  ]);
  return <>
  <ContextCartProvider>
    <Toaster/>
    <Offline><div className='offline'>You are offline! <i class="fa-solid fa-wifi"></i></div></Offline>
  <RouterProvider router={router}></RouterProvider>
  </ContextCartProvider>
  
  </>
}

export default App;