import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Categories() {
  let navigate = useNavigate()
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const myToken = localStorage.getItem('token');
    if (!myToken) {
      navigate('*');  
    }
  }, []);
  useEffect(()=>{
    getData()
  } , [])

  let getData = async ()=>{
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    let myData = data.data
    console.log(myData)
    setdata(myData)
    setloading(false);
  }


  if (loading) {
    return (
      <h1 className="d-flex justify-content-center vh100 largeText align-items-center">
        <i className="fa-solid fa-spinner fa-spin-pulse" style={{ color: '#63E6BE' }}></i>
      </h1>
    );
  }

  return <>
  <div className="container-fluid">
    <div className="row">
    <h1 className="text-center text-success mt-3">Categories</h1>
    <p className='text-muted fs-3 mt-4 text-center'>Discover a wide range of categories to suit all your needs. From fashion to electronics and home essentials, find everything you need in one place!
</p>

{data.map((cat)=> 
 <div className="col-lg-2 col-md-4 my-5 myCard" key={cat._id}>
   <img src={cat.image} className="w-100" style={{height: '300px'}} />
   <div className="text-center">
     <span className="text-success">{cat.slug}</span>
   </div>
</div>)}


    </div>
  </div>

    </>
}
