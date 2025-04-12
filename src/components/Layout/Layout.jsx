import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {Outlet} from 'react-router-dom'
import styles from './Layout.module.css';
export default function Layout() {
  return <>
    <Navbar/>
    <Outlet></Outlet>
    <Footer/>
    </>
}
