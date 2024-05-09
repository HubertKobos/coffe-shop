import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import { type CartProduct } from '../../types';
import { Button } from 'react-bootstrap';
import {useAppSelector, useAppDispatch} from "../../../hooks"
import { addProduct, hideNewAddedProductToast, deleteProduct, hideDeletedProductToast } from '../../features/cart/cartSlice';


type ProductCardProps = {
  product: CartProduct
  showBuyButton: boolean
  showDeleteButton: boolean
}

export default function ProductCard({product, showBuyButton, showDeleteButton}: ProductCardProps ) {
  const dispatch = useAppDispatch()
  const base64Image = `data:image/jpeg;base64, ${product.image}`
  const buyProductHandler = ():void => {
    dispatch(addProduct(product))
    
    setTimeout(() => {
      dispatch(hideNewAddedProductToast())
      
    }, 1000)
  }

  const deleteProductHandler = ():void =>{
    dispatch(deleteProduct(product.id))

    setTimeout(() => {
      dispatch(hideDeletedProductToast())
    }, 1000);
  }

  return (
    <Card style={{width: "22rem", margin: "20px", minHeight: "50%", maxHeight: "50%"}}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Card.Img variant="top" style={{height: "95%", width: "95%", marginTop: "20px"}} src={base64Image} />
      </div>
        <Card.Body>
          <Card.Title style={{marginBottom: "15px"}}>{product.quantity === 0 || product.quantity === undefined ? product.name : `${product.name} (${product.quantity})`}</Card.Title>
          <Card.Text>
          {
            <ul>
              {product.ingredients.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          } 

              
            {product.additionalInformation}
          </Card.Text>
        </Card.Body>
        <Card.Text style={{marginLeft: "auto", marginRight: "30px"}}>
          <Card.Text>
            {showBuyButton &&
              <Button variant='success' style={{
                                fontSize: "15px", 
                                marginBottom: "5px"
                              }}
                              onClick={buyProductHandler}>
                Buy for {product.price}$</Button>
                
          }
          {showDeleteButton && !showBuyButton &&
          <Button variant='danger' style={{
                    fontSize: "15px", 
                    marginBottom: "5px"
                  }}
                  onClick={deleteProductHandler}>
                  Delete from cart
          </Button>

          }
          </Card.Text>
        </Card.Text>
      </Card>
  )
}
