import React, { useContext, useEffect, useState } from 'react'
import {contextCart} from '../../Context/ContextCart'
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import  { toast } from 'react-hot-toast';



export default function Cart() {
  let navigate = useNavigate()
  useEffect(() => {
    const myToken = localStorage.getItem('token');
    
    if (!myToken) {
      navigate('*');  
    }
  }, []);


  const [dataLength, setdataLength] = useState(0)
  let{displayCart , deleteFromCart , updateCart ,setlength}= useContext(contextCart)
const [data, setData] = useState('not yet')
  const [loading, setloading] = useState(true)

const [cartId, setcartId] = useState('')

  useEffect(()=>{ 
    getCart()
  } , [])
  
  async function  getCart(){
    let result = await displayCart()
    let cartId = result.data.cartId
    setcartId(cartId)
    let data =result.data.data
    console.log(data.products.length)
    setdataLength(data.products.length)
    let cartLength = data.products.length
    setlength(cartLength)
    localStorage.setItem('cartNum' , cartLength)

    setData(data)
    setloading(false);
  }
  async function deleteItem(id){
    let item= await deleteFromCart(id)
    let myData =item.data.data
    console.log(item.data.numOfCartItems)
    if(item.data.status==='success'){
      toast.success('Your product is removed successfully' , {
                duration: 2000 , 
                position : 'bottom-right' , 
                style : {
                  padding : "20px"
                }
              }) 
    }
   
    let updatedLength = myData.products.length;
    setlength(updatedLength);
    localStorage.setItem('cartNum', updatedLength);
    setData(myData)
    if(item.data.numOfCartItems===0){
      setdataLength(0)
    }
  }
let goToPayment= (cartId)=>{
  if(dataLength>0){
    navigate(`payment/${cartId}`)
  }
}

  async function  updateMyCart(id , count , sign){
    if(sign === 'plus'){
      count++
    }else if (sign === 'minus' && count >0) {
      count--
    }else {
      return
    }
     let response = await updateCart(id , count)
     let updatedDate = response.data.data
     setData(updatedDate)
  }




  if(loading){
    return <h1 className='d-flex justify-content-center vh100 largeText align-items-center'><i class="fa-solid fa-spinner fa-spin-pulse" style={{color:"#63E6BE"}}></i></h1>
  }  
  return <>
   {data !== null ?  <div className="container-fluid" style={{minHeight : '80vh'}}>
    <h1 className='text-center mt-3 text-success' >Cart Details</h1>
    <p className='text-muted fs-3 mt-4 text-center'>Review your items and make sure everything is correct. You can update your cart anytime before proceeding to checkout</p>
        <h2>Shop Cart</h2>
        <h3 className='text-success'>Total Price : {data.totalCartPrice} EGP</h3>
        {data.products.length !== 0 ? (
  data.products?.map((product, index) => (
    <div className="row bg-light border border-bottom-1" key={index}>
      <div className="col-md-10 d-flex py-4 ">
        <div className="imgCart me-4">
          <img
            src={product.product.imageCover}
            className="my-2"
            style={{ width: '100px', height: '100px' }}
            alt=""
          />
        </div>
        <div className="textCart">
          <p>{product.product.title}</p>
          <p className="text-success">Price :{product.price}</p>
          <button
            onClick={() => deleteItem(product.product._id)}
            className="p-3 bg-danger text-white border border-0 rounded-3"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="col-md-2 d-flex align-items-center py-3">
        <button
          onClick={() => updateMyCart(product.product._id, product.count, 'plus')}
          className="bg-success border border-0 text-white"
          style={{ width: '30px' }}
        >
          +
        </button>
        <span className="px-2">{product.count}</span>
        <button
          onClick={() => updateMyCart(product.product._id, product.count, 'minus')}
          className="bg-success border border-0 text-white"
          style={{ width: '30px' }}
        >
          -
        </button>
      </div>
    </div>
  ))
) : <>
<p className='fs-4 text-muted text-center'>Your shopping cart is currently empty. Start shopping now!</p>
<div className="div d-flex justify-content-center">

<button onClick={() => navigate('/')} className="btn btn-success">Start Shopping</button>

</div>
</>
}

       <button onClick={()=> goToPayment(cartId)} className='btn btn-success w-100  my-4'>Payment</button>
    </div> : null}
    </>
}
