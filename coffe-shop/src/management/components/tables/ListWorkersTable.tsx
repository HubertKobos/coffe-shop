import {useEffect, useState} from "react"
import { Button, Table } from 'react-bootstrap'
import { Worker } from '../../../types'
import { deleteWorkerCall, getAllWorkersCall } from "../../apiCalls/apiCalls"
import { useNavigate } from "react-router-dom"
import { EDIT_WORKER } from "../../consts/managementconsts"

export default function ListWorkersTable() {
  const navigate = useNavigate()
  const [workers, setWorkers] = useState<Worker[]>([])

  const deleteButtonHandler = (id: number) =>{
    deleteWorkerCall(id).then((response) =>{
      if("data" in response){
        if(response.status === 200){
          setWorkers(prev => prev.filter(worker => worker.id !== id))
        }
      }
    })
  }

  const editButtonHandler = (workerId: number) =>{
    navigate("/" + EDIT_WORKER.replace(":workerId", workerId.toString()))
  }

  useEffect(() =>{
    getAllWorkersCall().then((response) =>{
      console.log(response)
      if("data" in response){
        if(response.status === 200){
          setWorkers(response.data)
        }
      }
    })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Surname</th>
          <th>Insurance Id</th>
          <th>Insurance Expiration</th>
          <th>Work Contract Id</th>
          <th>Work Contract Expiration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((item: Worker, key: number) =>(
            <tr>
            <td>{key+1}</td>
            <td>{item.firstName}</td>
            <td>{item.surname}</td>
            <td>{item.insuranceId}</td>
            <td>{item.insuranceDate.split('T')[0]}</td>
            <td>{item.workContractId}</td>
            <td>{item.workContractDate.split('T')[0]}</td>
            <td>
                <Button variant='outline-primary' onClick={() => editButtonHandler(item.id)} style={{marginRight: "8px"}}>Edit</Button>
                <Button variant='outline-danger' onClick={() => deleteButtonHandler(item.id)}>Delete</Button>
            </td>
            </tr>

        ))}
      </tbody>
    </Table>
  )
}
