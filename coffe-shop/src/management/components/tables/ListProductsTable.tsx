import {useState, useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import { Product } from '../../../types'
import { deleteProductCall, getAllProductsCall } from '../../apiCalls/apiCalls'
import {BsDot} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { EDIT_PRODUCT_PATH } from '../../consts/managementconsts'

export default function ListProductsTable() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getAllProductsCall().then((response) => {
      console.log(response)
      if("data" in response){
        if(response.status === 200){
          setProducts(response.data)
        }
      }
    })
    
  }, [])
  const handleDeleteProductButton = (productId: number) =>{
    deleteProductCall(productId).then(response => {
      if("status" in response){
        setProducts(prev => prev.filter(product => product.id !== productId))
      }
    })
  }

  const handleEditProductButton = (productId: number) =>{
    navigate("/" + EDIT_PRODUCT_PATH.replace(":productId", productId.toString()))
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Additional Information</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: Product, key: number) =>(
            <tr>
            <td>{key+1}</td>
            <td>{item.name}</td>
            <td>
                {Object.entries(item.ingredients).map(([key, value]) =>(
                    <h3 style={{fontSize: "15px"}}><BsDot /> {value}</h3>
                ))}
            </td>
            <td>{item.additionalInformation}</td>
            <td>{item.price}$</td>
            <td>
                <Button variant='outline-primary' onClick={() => handleEditProductButton(item.id)} style={{marginRight: "8px"}}>Edit</Button>
                <Button variant='outline-danger' onClick={() => handleDeleteProductButton(item.id)}>Delete</Button>
            </td>
            </tr>

        ))}
      </tbody>
    </Table>
  )
}
