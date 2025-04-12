import React, { useState } from 'react'
import styles from './SignIn.module.css';
import { useFormik  , Formik} from 'formik';
import axios from 'axios'
import{Link, useNavigate} from 'react-router-dom'

export default function SignIn() {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
    const [err, seterr] = useState(null)
    const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const formik = useFormik({
      initialValues : {
      email:"",
      password:"",
      },onSubmit: async (values)=>{
        setLoading(true)
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values).catch(
          err=>seterr(err.response.data.message)
        )
        setLoading(false)
        let myToken = response.data.token
        localStorage.setItem('token', myToken)
        navigate("/")
      }
      ,validate
    })
  return <>
  <div className="container " style={{height : '80vh'}}>
    <div className="row">
    <form className='w-75 mx-auto mt-5' onSubmit={formik.handleSubmit} >
    <h1 className='text-center text-success'>SignIn Form</h1>
    {err!==null ? <div className='alert alert-danger' role='alert'>{err}</div> : null}
    <label htmlFor="email" className='mt-3'>Email Address:</label>
    <input onBlur={formik.handleBlur} type="email" name='email' id='email' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.email} />
    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">{formik.errors.email}</div> :null}

    <label htmlFor="password" className='mt-3'>Password:</label>
    <input onBlur={formik.handleBlur} type="password" name='password' id='password' className='w-100 form-control mt-3' onChange={formik.handleChange} value={formik.values.password} />
    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" role="alert">{formik.errors.password}</div> :null}
    
    <Link to={'/forgetPassword'}>
  <p className='text-end pt-3 text-primary'>Forget your password?</p>
</Link>
  
    {loading ?   <button  type="button" className='btn bg-success mt-3 text-white'>
    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
    </button> :     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-success mt-3 text-white'>Submit</button>
  }
    </form>
    </div>
  </div>
    
    </>
}
