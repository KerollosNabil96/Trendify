import React from 'react'
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
export default function Footer() {
  return <>
    <div className="container-fluid bg-light py-4">
      <div className="row">
        <div className="col-md-4">
          <h1 className='text-success'>Trendify</h1>
          <p className='text-muted mt-4'>Shop with Trendify for the best online shopping experience.<br/> We offer a wide range of high-quality products at competitive prices,<br/>  with fast and secure delivery services. Explore our diverse collection<br/>  and stay connected with us to meet all your shopping needs.<br/> 
Feel free to modify it as needed .</p>
        </div>
        <div className="col-md-4 my-sm-5 my-md-3" >
          <h2 className='text-success '>Quick Links</h2>
          <h3><Link className='text-muted' style={{textDecoration:'none'}} to={"/"}>Home</Link></h3>
          <h3><Link className='text-muted' style={{textDecoration:'none'}}  to={'/products'}>Products</Link></h3>
          <h3><Link className='text-muted' style={{textDecoration:'none'}}  to={'/cart'}>Cart</Link></h3>
          <h3><Link className='text-muted' style={{textDecoration:'none'}}  to={'categories'}>Categories</Link></h3>
        </div>
        <div className="col-md-4 ">
          <h2 className='text-success pt-4 '>Contact US</h2>
          <h5 className='text-muted my-4'><i class="fa-solid fa-mobile text-success me-3"></i> 01229271686</h5>
          <h5 className='text-muted my-4'><i class="fa-solid fa-envelope text-success me-3"></i>trendify@gmail.com</h5>
          <h5 className='text-muted my-2'> <i class="fa-solid fa-location-pin text-success me-3"></i> Sedi-Beshr, Alexandria</h5>
        </div>
      </div>
    </div>
    </>
}
