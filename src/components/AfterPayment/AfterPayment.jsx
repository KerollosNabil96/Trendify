import React, { useEffect } from 'react'
import styles from './AfterPayment.module.css';
import checkMark from '../../Assets/Check-mark.png'
import { useNavigate } from 'react-router-dom';
export default function AfterPayment() {
let navigate = useNavigate()
let myToken= localStorage.getItem('token')
console.log(localStorage.getItem('payment'))
useEffect(() => {
  if (!myToken) {
    navigate('/signin');  
  }else if (myToken && localStorage.getItem('payment')!=='success'){
    navigate('/'); 
  }
}, []);
let goHome = ()=>{
  if(myToken){
    navigate('/')
    localStorage.removeItem('payment')
  }
}
  return <>
  <div className="container" style={{minHeight : '80vh'}}>
    <div className="row">
      <div className="col-12">
        <div className={`parent , ${styles.shadow} my-5 rounded-2`} >
          <div className="img pt-4 d-flex justify-content-center">
            <img src={checkMark} alt="check mark" height={'150px'} />
          </div>
          <h2 className='text-success text-center pb-4'>Payment Successful!</h2>
          <div className="parent d-flex  justify-content-center py-4">
          <div className={`w-50 ${styles.shadow2 } rounded-4 px-4 py-5`}>
            <h2 className='text-center text-muted py-3'>Your payment was Successful</h2>
            <p className=' text-center fs-5'>Thank you for your payment . we will be in contact <br/> with more details shortly</p>
            <div className="d-flex justify-content-center">
    <button onClick={goHome} className="btn btn-success p-3 px-4">Go Homepage</button>
    </div>
  </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
    </>
}
