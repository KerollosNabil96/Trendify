import React, { useContext, useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { contextCart } from '../../Context/ContextCart';
import { toast } from 'react-hot-toast';

export default function Products() {
  const { addToCart, setlength, length } = useContext(contextCart);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [categories, setcategories] = useState(null);
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const myToken = localStorage.getItem('token');
    
    if (!myToken) {
      navigate('*');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then(res => {
      setData(res.data.data);
      setFilteredData(res.data.data); 
      setloading(false);
    });
  }, []);


   useEffect(() => {
      if (searchTerm) {
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data); 
      }
    }, [searchTerm, data]);


  function getIdofProduct(id) {
    console.log(id + ' from the main card not button');
  }

  async function sendIdtoCart(id) {
    let result = await addToCart(id);
    console.log(result.data.numOfCartItems);
    let updatedLength = result.data.numOfCartItems;
    localStorage.setItem('cartNum', updatedLength);
    setlength(updatedLength);

    if (result.data.status === 'success') {
      toast.success(result.data.message, {
        duration: 2000,
        position: 'bottom-right',
        style: {
          padding: '20px',
        },
      });
    }
  }

  if (loading) {
    return (
      <h1 className="d-flex justify-content-center vh100 largeText align-items-center">
        <i className="fa-solid fa-spinner fa-spin-pulse" style={{ color: '#63E6BE' }}></i>
      </h1>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center text-success mt-3">Products</h1>
        <p className='text-muted fs-3 mt-4 text-center'>Browse through our products and choose your favorites. Add them to your cart and proceed when ready.</p>
        <div className="col-12 text-center my-3 mt-5">
            <input
              type="text"
              className="form-control w-50 mx-auto"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        <div className="row">
          {filteredData.map((Product) => {
            return (
              <div className="col-lg-2 col-md-4 my-5 myCard" key={Product._id}>
                <Link
                  to={`/product-details/${Product._id}`}
                  onClick={() => getIdofProduct(Product._id)}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img src={Product.imageCover} className="w-100" />
                  <div className="text-center">
                    <span className="text-success">{Product.brand.slug}</span>
                  </div>
                  <h4 className="text-center">{Product.title.split(' ').slice(0, 2).join(' ')}</h4>
                  <div className="d-flex justify-content-between px-3">
                    <span>{Product.price} EGP</span>
                    <span>
                      <i className="fas fa-star" style={{ color: '#FFB300', fontSize: '18px' }}></i>
                      {Product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => sendIdtoCart(Product._id)}
                  className="bg-success text-white py-2 w-100 rounded-4 border border-0 myBtn"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}