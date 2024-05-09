import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createWorkerCall } from '../../apiCalls/apiCalls';
import { ApiError, CreateWorkerResponse } from '../../apiCalls/apiTypes';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddWorkerForm() {
    const navigate =  useNavigate()
    const [firstName, setFirstName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [insuranceId, setInsuranceId] = useState<string>("")
    const [insuranceDate, setInsuranceDate] = useState<Date>()
    const [workContractId, setWorkCotnractId] = useState<string>("")
    const [workContractDate, setWorkContractDate] = useState<Date>()

    const handleCreateWorkerButton = () =>{
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('surname', surname)
      formData.append('insuranceId', insuranceId)
      if(insuranceDate){
        formData.append('insuranceDate', insuranceDate?.toDateString())
      }
      formData.append('workContractId', workContractId)
      if(workContractDate){
        formData.append('workContractDate', workContractDate?.toDateString())
      }
      
      createWorkerCall(formData).then((response: CreateWorkerResponse | ApiError) =>{
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
          <Form.Label>First Name</Form.Label>
          <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First name" />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Surname</Form.Label>
          <Form.Control onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Surname" />
      </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Insurance id</Form.Label>
                <Form.Control onChange={(e) => setInsuranceId(e.target.value)} type="text" placeholder='Insurance id' />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Insurance</Form.Label>
                <Form.Control onChange={(e) => setInsuranceDate(new Date(e.target.value))} type="date" />
            </Form.Group>
        
        </Col>
            
      </Row>
      <Row>
        <Col>
        <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Work Contract Id</Form.Label>
                <Form.Control onChange={(e) => setWorkCotnractId(e.target.value)} type="text" placeholder='Work cotnract id' />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Work Contract</Form.Label>
                <Form.Control onChange={(e) => setWorkContractDate(new Date(e.target.value))} type="date" />
            </Form.Group>
        
        </Col>
        
      </Row>
      <Row>
      </Row>
      <Button onClick={() => handleCreateWorkerButton()}>Create</Button>
    </Form>
  )
}
