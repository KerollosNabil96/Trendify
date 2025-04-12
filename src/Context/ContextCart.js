import axios from "axios";
import { createContext, useState } from "react";

export let contextCart = createContext(0) ;



export default function ContextCartProvider(props){
    function addToCart(id){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart" , { productId : id} , {
            headers : {
                token : localStorage.getItem('token')
            }
        }).then((response)=>response).catch((error)=>error)
    }
    function displayCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers : {
                token : localStorage.getItem('token')
            }
        }).then((response)=>response).catch((error)=>error)
    }
    const [length, setlength] = useState(0)


    function deleteFromCart(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers : {
                token : localStorage.getItem('token')
            }
        } ).then((response)=>response).catch((error)=>error)
    }

    function updateCart(id , countNum){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count :countNum } , {
            headers : {
                token : localStorage.getItem('token')
            }
        }).then((response)=>response).catch((error)=>error)
    }


    return <contextCart.Provider value={{addToCart ,displayCart , deleteFromCart ,updateCart ,length , setlength}}>
        {props.children}
    </contextCart.Provider>
}