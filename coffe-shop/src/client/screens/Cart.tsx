import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ProductCard from '../components/ProductCard'
import { Alert, Button } from 'react-bootstrap'
import { placeOrder } from '../../features/cart/cartSlice'
import CartFooter from '../components/CartFooter'

export default function Cart() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.cart.products)
  const productsExistsInTheCart:boolean = products.length > 0

  return (
    <div>
      <div style={{display: "flex", flexDirection: "column", minHeight: "95vh"}}>
        {
        productsExistsInTheCart ? 
          products.map((product)=>(
            <ProductCard product={product} showBuyButton={false} showDeleteButton={true}/>
          ))
          :
          <div style={{width: "100%"}}>
            <Alert variant='danger'>
              Cart is empty
            </Alert>

          </div>
      }
      <CartFooter/>
      </div>
    </div>
  )
}
