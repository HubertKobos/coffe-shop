import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsCall, updateProductCall } from '../../apiCalls/apiCalls';
import { BsDot } from 'react-icons/bs';

export default function EditProductForm() {
    const navigate = useNavigate()
    const {productId} = useParams<{productId?: string}>()
    const [productName, setProductName] = useState<string>("")
    const [ingredient, setIngredient] = useState<string>("")
    const [price, setPrice] = useState<Number>()
    const [ingredients, setIngredients] = useState<Array<string>>([])
    const [additionalInformation, setAdditionalInformation] = useState<string>()
    const [image, setImage] = useState<File | undefined>()

    useEffect(() =>{
        if(productId){
            getProductsCall(productId).then(response =>{
              console.log(response)
                if("data" in response){
                  console.log(response)
                    if(response.status === 200 && response.data){
                        setProductName(response.data.name)
                        setIngredients(response.data.ingredients)
                        setPrice(response.data.price)
                        setAdditionalInformation(response.data.additionalInformation)
                        
                    }
                }
                if("status" in response){
                  if(response.status === 403){
                    navigate("/management")
                  }
                }
            })

        }
    }, [])

    const handleSaveButtonHandler = () =>{
      const formData = new FormData()

      formData.append("productName", productName)
      if(ingredients.length>0){
        ingredients.forEach( ingred => 
          formData.append("ingredients", ingred)
        )
      }else{
        formData.append('ingredients', '');
      }
      if(price){
        formData.append("price", price.toString())
      }
      if(image){
        formData.append("image", image)
      }
      if(additionalInformation){
        formData.append("additionalInformation", additionalInformation)
      }

      if(productId){
        updateProductCall(formData, productId).then(response=>{
          if("status" in response){
            if(response.status === 200){
              console.log(response)

            }
          }
        })

      }
    }

    const handleDeleteIngredientButton = (text: string) =>{
      setIngredients(prev => prev.filter(cont => cont !== text))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === "Enter"){
          e.preventDefault()
          setIngredients([...ingredients, ingredient])
          setIngredient("")
        }
      }

  return (
    <Form>
      <Row>
        <Col>
        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control value={productName} onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Product name" />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control min={0.1} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="Price" />
      </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group className="mb-4" controlId="formGroupEmail">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control onChange={(e) => setIngredient(e.target.value)} onKeyDown={handleKeyDown} value={ingredient} type="text" placeholder="Ingredients" />
            <Col>
            {ingredients && 
              ingredients.map((item, index) => (
                <Row key={index} style={{ alignItems: "center"}}>
                  <Form.Text style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                    <Button style={{ marginRight: "5px", fontSize:"15px" }} variant='danger' onClick={() => handleDeleteIngredientButton(item)}>Delete</Button> 
                    <h3 style={{ fontSize: "20px", margin: "0" }}>{item}</h3>
                  </Form.Text>
                </Row>
              ))
            }
          </Col>
        </Form.Group>
      </Row>
      <Row>
      <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Additional Information</Form.Label>
          <Form.Control value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} type="text" placeholder="Additional Information" />
      </Form.Group>
      </Row>
      <Row>
      <Form.Group controlId="formFile" className="mb-4">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      </Row>
      <Button onClick={() => handleSaveButtonHandler()}>Save</Button>
    </Form>
  )
}
