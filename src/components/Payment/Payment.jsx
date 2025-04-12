import React, { useState } from 'react'
import styles from './Payment.module.css';
import { useParams } from 'react-router-dom';
import { useFormik  , Formik} from 'formik';
import axios from 'axios'

export default function Payment() {

let {id} = useParams()
const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.email = 'phone is required';
  } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!values.details) {
    errors.details = 'Details is required';
  }

  if (!values.city) {
    errors.city = 'City is required';
  }
  return errors;
};





const formik = useFormik({
  initialValues : {
    details : '',
    phone : '' , 
    city : ''
  }, validate ,   
  onSubmit: async (values )=>{
    console.log(id)
    let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` , 
      {
        shippingAddress:{
            "details": values.details,
            "phone": values.phone,
            "city": values.city
            }
    },
    {
      headers: {
        token:localStorage.getItem('token')
      }
    }
    
    )

if(response.data.status==='success'){
  window.location.href = response.data.session.url
  localStorage.setItem('payment' , 'success')
}else{
  console.error('error at payment')
}
  }
})

  return <>
        <div className="container" style={{minHeight : '80vh'}}>
        <div>
        <h2 className="text-center text-success mt-4">Fill in Your Delivery Information</h2>
                  <p className="text-center">
          Please provide the necessary address information to proceed with your order.
          </p>
        </div>
      <form onSubmit={formik.handleSubmit} className='my-5'>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className='alert alert-danger'>{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <label htmlFor="details" className='pt-3 pb-2'>Details</label>
          <textarea
            id="details"
            name="details"
            className='form-control'

            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
          {formik.errors.details && formik.touched.details && (
            <div className='alert alert-danger'>{formik.errors.details}</div>
          )}
        </div>

        <div>
          <label htmlFor="city" className='pt-3 pb-2'>City</label>
          <input
            type="text"
            id="city"
            name="city"
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city && (
            <div className='alert alert-danger'>{formik.errors.city}</div>
          )}
        </div>

        <button className='btn btn-success my-3 py-3' type="submit">Submit Payment</button>
      </form>
    </div>
    </>
}
