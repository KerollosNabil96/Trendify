import React, { useEffect, useState } from 'react'
import styles from './ForgetPassword.module.css';
import { Formik, useFormik } from 'formik';

import axios from 'axios';
export default function ForgetPassword() {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors
  }


  const [update, setupdate] = useState('')
  let formik = useFormik({
    initialValues : {
      email : ''
    },onSubmit : async (values)=> {
      try {
        let response= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values )
      console.log(response.data)
      if(response.data.statusMsg == 'success'){
        setupdate(response.data.message )
      }else{
        setupdate('This email is not registerd in Trendify !')
      }
        
      } catch (error) {
        setupdate('This email is not registerd in Trendify !');
      }
      

    },validate
  })
  useEffect(() => {
    if (update) {
      setShowToast(true); 
      const timer = setTimeout(() => {
        setShowToast(false); 
        setupdate(''); 
      }, 4000);
      
      return () => clearTimeout(timer);  
    }
  }, [update]);
  const [showToast, setShowToast] = useState(false);
 
  return <>
  <div className="container " style={{minHeight : '80vh'}}>
  <h1 className='text-center text-success fw-bold mt-4'>Forgot Your Password?</h1>
<p className='text-center text-muted fs-3 mb-4'>
  No worries! Just enter your registered email address and <br/> we’ll send you a code to reset your password.
</p>
    <div className="row">
    <form onSubmit={formik.handleSubmit} className='w-75 my-4 mx-auto mt-4'>
      <label htmlFor="email">Email Address :</label>
      <input  onBlur={formik.handleBlur} onChange={formik.handleChange}  type="email" name='email' id='email' className='w-100 form-control mt-3' value={formik.values.email}  placeholder='Please enter your email address' />
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2" role="alert">{formik.errors.email}</div> :null}
      { showToast  && !formik.errors.email ? <div className="alert alert-success mt-2" role="alert">{update}</div> :null}
      <button type='submit' disabled={!(formik.dirty && formik.isValid)}  className='bg-success border border-0 text-white p-3 rounded-3 mt-4'>Submit</button>
      </form>
    </div>
  </div>
      
    </>
}
