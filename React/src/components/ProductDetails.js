import React from 'react'
import {
    Link,
    useParams
  } from "react-router-dom";



const ProductDetails = ({products}) => {
    let { id } = useParams();
    const getProduct = products.find(product=> parseInt(product.id) === parseInt(id))
    
    return (
        <div className="pt-3">
            This site gives more details about product: <b>{getProduct.text} </b> which costs {getProduct.price}€ 
        <div className="pt3">       
        <Link to="/">Back to product page</Link>
        </div> 
        </div>
    )
}

export default ProductDetails