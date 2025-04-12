import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import{useNavigate} from 'react-router-dom'
import styles from './SignUp.module.css';

export default function SignUp() {
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    } else if (values.name.length < 3 || values.name.length > 15) {
      errors.name = 'Name must be between 3 and 15 characters';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(values.password)) {
      errors.password = 'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
    }

    if (!values.rePassword) {
      errors.rePassword = 'Repassword is required';
    } else if (values.rePassword !== values.password) {
      errors.rePassword = 'Password and repassword must be the same';
    }

    if (!values.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }

    return errors;
  };
      const [loading, setLoading] = useState(false)
  const [err, seterr] = useState(null)
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },onSubmit: async (values)=>{
      setLoading(true)
      let response= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch(
        err=>seterr(err.response.data.message)
      )
      console.log(response.data.token , 'data has been sent successfully')
      setLoading(false)
      navigate('/signin')
    },validate
  })



  return <>
  <div className={`container`} style={{minHeight : '80vh'}}>
    <div className="row">
      
    <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
    <h1 className='text-center text-success'>SignUp Form</h1>
    {err!==null ? <div className='alert alert-danger' role='alert'>{err}</div> : null}
    <label htmlFor="name" className='mt-3'>Name :</label>
    <input onBlur={formik.handleBlur}  type="text" name='name' id='name' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.name} />
    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger" role="alert">{formik.errors.name}</div> :null}
    <label htmlFor="email" className='mt-3'>Email Address:</label>
    <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.email} />
    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">{formik.errors.email}</div> :null}

    <label htmlFor="password" className='mt-3'>Password:</label>
    <input onBlur={formik.handleBlur} type="password" name='password' id='password' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.password} />
    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" role="alert">{formik.errors.password}</div> :null}

    <label htmlFor="rePassword" className='mt-3'>Repassword:</label>
    <input onBlur={formik.handleBlur} type="password" name='rePassword' id='rePassword' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.rePassword} />
    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger" role="alert">{formik.errors.rePassword}</div> :null}

    <label htmlFor="phone" className='mt-3'>Phone:</label>
    <input onBlur={formik.handleBlur} type="tel" name='phone' id='phone' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.phone} />
    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger" role="alert">{formik.errors.phone}</div> :null}

    {loading ?   <button  type="button" className='btn bg-success mt-3 text-white'>
    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
    </button> :     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-success mt-3 text-white'>Submit</button>
  }
    
  </form>
    </div>
  </div>
  
    </>
}
