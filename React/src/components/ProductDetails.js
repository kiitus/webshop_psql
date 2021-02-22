import React from 'react'
import {useState, useEffect} from "react"
import {
    Link,
    useParams
  } from "react-router-dom";
  import axios from 'axios';


  //Shows more detail about specific product 

  
 const ProductDetails = () => {
    
    const [product, setProduct] = useState({})
    let { id } = useParams();

  //  const adress = "http://localhost:3001/productBack/"
  const adress = "/productBack/"

  //Loads details about the product from database
    useEffect(() => {
     
        axios.get(`${adress}/id/${id}`).then((result)=>
        {
            setProduct(result.data)
        })
      }, [id])
    
      if(product ==="")
      {
          return(<div><h2 className="pt-2">Item not found</h2>
          <Link to="/">Back to product page</Link></div>)
      }

    return (
        <div className="pt-3">
            This site gives more details about product: <b>{product.text} </b> which costs {product.price}€ 
        <div className="pt3">       
        <Link to="/">Back to product page</Link>
        </div> 
        </div>
    )
}

export default ProductDetails