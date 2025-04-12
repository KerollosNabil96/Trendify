import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { contextCart } from '../../Context/ContextCart';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  let myData;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, setlength, length } = useContext(contextCart);


  useEffect(() => {
    let fetchData = async () => {
      let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).catch((err) => console.log(err));
      myData = data.data.data;
      setProduct(myData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

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
      <div className="container" style={{minHeight: '80vh'}}>
        <div className="row">
          <div className="col-md-4 my-5">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
              <div className="carousel-inner">
                {product.images.map((image, index) => {
                  return (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <img src={image} className="d-block w-100" alt={`product-image-${index}`} />
                    </div>
                  );
                })}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-8 my-5">
            <h2>{product.title}</h2>
            <span className="text-muted">{product.description}</span>
            <p className="my-4">
              <span className="fw-bold">Category</span> : {product.subcategory[0].slug}
            </p>
            <div className="d-flex justify-content-between">
              <span>
                <span className="fw-bold">Price :</span> {product.price} EGP
              </span>
              <span>
                <i className="fas fa-star" style={{ color: '#FFB300', fontSize: '18px' }}></i>
                {product.ratingsAverage}
              </span>
            </div>
            <button onClick={() => sendIdtoCart(product._id)} className="bg-success text-white py-2 w-100 rounded-4 border border-0 mt-3"> Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
