import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { contextCart } from '../../Context/ContextCart';
import { toast } from 'react-hot-toast';
import sliderImg1 from '../../Assets/main-slider-3.jpeg';
import sliderImg2 from '../../Assets/main-slider-1.jpeg';
import sliderImg3 from '../../Assets/main-slider-2.jpeg';

export default function Home() {
  let { setlength, length } = useContext(contextCart);
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
    useEffect(() => {
      const myToken = localStorage.getItem('token');
      
      if (!myToken) {
        navigate('signin');  
      }
    }, []);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then((res) => {
      setData(res.data.data);
      setFilteredData(res.data.data); 
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res) => {
      setCategories(res.data.data);
      setLoading(false);
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

  let { addToCart } = useContext(contextCart);

  const sendIdtoCart = async (id) => {
    let result = await addToCart(id);
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
  };

  if (loading) {
    return (
      <h1 className="d-flex justify-content-center vh100 largeText align-items-center">
        <i className="fa-solid fa-spinner fa-spin-pulse" style={{ color: '#63E6BE' }}></i>
      </h1>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ margin: '0px', padding: '0px', overflow: 'hidden', minHeight: '80vh' }}
      >
        <div className="row" style={{ overflow: 'hidden' }}>
         

          <div className="col-md-8 my-lg-5 ps-lg-5" style={{ padding: '0px', height: '400px' }}>
            <Slider {...settings2} style={{ height: '400px' }}>
              <div>
                <img src={sliderImg1} alt="main-slider-image 1" className="w-100" style={{ height: '400px' }} />
              </div>
              <div>
                <img src={sliderImg2} alt="main-slider-image 2" className="w-100" style={{ height: '400px' }} />
              </div>
            </Slider>
          </div>

          <div className="col-md-4 my-lg-5 pe-lg-5" style={{ padding: '0px' }}>
            <div className="child1">
              <img src={sliderImg2} alt="main-slider-image 2" className="w-100" style={{ height: '200px' }} />
            </div>
            <div className="child1">
              <img src={sliderImg3} alt="main-slider-image 3" className="w-100" style={{ height: '200px' }} />
            </div>
          </div>
        </div>

    
        <Slider {...settings} className="mt-4">
          {categories?.map((category) => {
            return (
              <div key={category._id}>
                <img src={category.image} style={{ height: '300px' }} className="w-100" />
              </div>
            );
          })}
        </Slider>
        <div className="col-12 text-center my-3 mt-5">
            <input
              type="text"
              className="form-control w-50 mx-auto"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        <div className="row mx-3">
          {filteredData.map((Product) => {
            return (
              <div className="col-lg-2 col-md-4 my-5 myCard" key={Product._id}>
                <Link to={`/product-details/${Product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
