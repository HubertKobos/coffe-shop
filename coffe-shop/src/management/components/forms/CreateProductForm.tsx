import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { BsDot } from 'react-icons/bs';
import { ApiError, CreateProductResponse } from '../../apiCalls/apiTypes';
import { createProductCall } from '../../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';

export default function CreateProductForm() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0)
  const [ingredients, setIngredients] = useState<Array<string>>([])
  const [ingredient, setIngredient] = useState<string>("")
  const [additionalInformation, setAdditionalInformation] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === "Enter"){
      e.preventDefault()
      setIngredients([...ingredients, ingredient])
      setIngredient("")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const selectedImage = e.target.files && e.target.files[0]
    setImage(selectedImage)
  }

  const handleCreateProductButton = () =>{
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price.toString());
    ingredients.forEach((ingredient, index) => {
      formData.append('ingredients', ingredient);
    });
    formData.append('additionalInformation', additionalInformation);
    if (image){
      formData.append('image', image);

    }
    
    createProductCall(
      formData
    ).then((response: CreateProductResponse | ApiError) =>{
      console.log(response)
      if("data" in response){
          if(response.status === 201){ 
            navigate("/management")
          }
      }else{
          console.error(response.message)
      }
  
})
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
                  <Form.Text style={{ display: "flex", alignItems: "center" }}>
                    <BsDot style={{ marginRight: "5px" }} /> 
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
        <Form.Control type="file" onChange={handleImageChange}/>
      </Form.Group>
      </Row>
      <Button onClick={() => handleCreateProductButton()}>Create</Button>
    </Form>
  )
}
