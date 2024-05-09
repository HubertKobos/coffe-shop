import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { getWorkerCall, updateWorkerCall } from '../../apiCalls/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { Worker } from '../../../types';

export default function EditWorkerForm() {
    const navigate = useNavigate()
    const {workerId} = useParams<{workerId?: string}>()
    const [worker, setWorker] = useState<Worker>()
    const [firstName, setFirstName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [insuranceId, setInsuranceId] = useState<string>("")
    const [insuranceDate, setInsuranceDate] = useState<string>()
    const [workContractId, setWorkContractId] = useState<string>("")
    const [workContractDate, setWorkContractDate] = useState<string>()

    const handleEditWorkerButton = () =>{
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('surname', surname)
        formData.append('insuranceId', insuranceId)
        if(insuranceDate){
            formData.append('insuranceDate', insuranceDate)
        }
        formData.append('workContractId', workContractId)
        if(workContractDate){
            formData.append('workContractDate', workContractDate)
        }

        if(workerId !== undefined){
            updateWorkerCall(formData, workerId).then(response =>{
                if("data" in response){
                    if(response.status === 200){
                        navigate("/management")
                    }
                }
            })

        }
    }

    useEffect(() =>{
        getWorkerCall(workerId).then(response =>{
            console.log(response)
            if("data" in response){
                if(response.status === 200){ 
                  setFirstName(response.data.firstName)  
                  setSurname(response.data.surname)
                  setInsuranceId(response.data.insuranceId)
                  setInsuranceDate(response.data.insuranceDate.split("T")[0].toString())
                  setWorkContractDate(response.data.workContractDate.split("T")[0].toString())
                  setWorkContractId(response.data.workContractId)
                }
            }else if("status" in response){
                if(response.status === 404){
                    navigate("/management")
                }
            }
            
        })
    }, [])

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
          <Form.Control value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Surname" />
      </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Insurance id</Form.Label>
                <Form.Control value={insuranceId} onChange={(e) => setInsuranceId(e.target.value)} type="text" placeholder='Insurance id' />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Insurance</Form.Label>
                <Form.Control value={insuranceDate} onChange={(e) => setInsuranceDate(new Date(e.target.value).toISOString().split("T")[0])} type="date" />
            </Form.Group>
        
        </Col>
            
      </Row>
      <Row>
        <Col>
        <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Work Contract Id</Form.Label>
                <Form.Control value={workContractId} onChange={(e) => setWorkContractId(e.target.value)} type="text" placeholder='Work cotnract id' />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-4" controlId="formGroupEmail">
                <Form.Label>Work Contract</Form.Label>
                <Form.Control value={workContractDate} onChange={(e) => setWorkContractDate(new Date(e.target.value).toISOString().split("T")[0])} type="date" />
            </Form.Group>
        
        </Col>
        
      </Row>
      <Row>
      </Row>
      <Button onClick={() => handleEditWorkerButton()}>Save</Button>
    </Form>
  )
}
