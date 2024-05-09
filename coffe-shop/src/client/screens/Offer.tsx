import ProductCard from "../components/ProductCard"

import { useEffect, useState } from "react"
import { getAllProductsCall } from "../../management/apiCalls/apiCalls"
import { Product } from "../../types"

export default function Offer() {
  const [products, setProducts] = useState<Product[]>([])

  // TODO: fetching data to products array
  useEffect(() =>{
    getAllProductsCall().then(response =>{
      console.log(response)
      if("data" in response){
        if(response.status === 200){
          setProducts(response.data)
        }
      }
    })
  }, [])

  return (
    <div style={{display: "flex"}}>
      {products.map(product => (
        <ProductCard product={{...product, quantity: 0}} showBuyButton={true} showDeleteButton={false}/>
      ))}
      
    </div>
  )
}
