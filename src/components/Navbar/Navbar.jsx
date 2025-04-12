import React, { useContext, useEffect, useState } from 'react'
import styles from '../Navbar/Navbar.module.css'; 
import {contextCart} from '../../Context/ContextCart'
import{Link, NavLink} from 'react-router-dom'
import{useNavigate} from 'react-router-dom'
export default function Navbar() {
 let {length , setlength}= useContext(contextCart)
  let myToken =localStorage.getItem('token')
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin')
  };
  let cartLength = localStorage.getItem('cartNum')

  useEffect(()=>{
    if(length){
      setlength(length)
    }
  },[length])

  let goCart=()=>{
    if(myToken){
      navigate('/cart')
    }else{
      navigate('signin')
    }
  }
  
  
  return <>
    <nav className="navbar navbar-expand-sm navbar-light px-3 bg-light">
  <Link className={`navbar-brand text-success ${styles.logo}`} to="/">Trendify</Link>
  <button
    className="navbar-toggler d-lg-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#collapsibleNavId"
    aria-controls="collapsibleNavId"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavId">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      {myToken ? (
        <>
          <li className="nav-item active">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to=""
            >
              Home
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to="cart"
            >
              Cart
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to="products"
            >
              Products
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to="categories"
            >
              Categories
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
        </>
      ) : null}
    </ul>
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      {myToken ? (
        <>
          <i
            onClick={goCart}
            style={{ cursor: 'pointer' }}
            className={`fa-solid fa-cart-shopping d-flex align-items-center crt pe-3 fs-3 ${styles.crt}`}
          >
            <p className={`bg-danger border border-0 text-white ${styles.num}`}>
              {length !== 0 ? length : cartLength}
            </p>
          </i>
          <li className="nav-item">
            <span className="nav-link cursor" onClick={handleLogout}>
              LogOut <span className="sr-only">(current)</span>
            </span>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to="signin"
            >
              SignIn
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? `nav-link active text-success` : 'nav-link active text-black'
              }
              to="signup"
            >
              SignUp
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  </div>
</nav>
    </>
}
