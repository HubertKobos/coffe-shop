import { Button, Nav } from 'react-bootstrap'
import { ADD_WORKER_PATH, CREATE_PRODUCT_PATH, LIST_PRODUCTS_PATH, LIST_WORKERS } from '../consts/managementconsts'
import { useAppDispatch } from '../../../hooks'
import { logout } from '../../features/auth/authSlice'

export default function ManagementHeader() {
  const dispatch = useAppDispatch()

  const logoutButtonHandler = (): void => {
    localStorage.removeItem("user")
    dispatch(logout())
  }
  
  return (
    <Nav className='flex-column' >
        <Nav.Link href={CREATE_PRODUCT_PATH}><Button variant='outline-primary' style={{width: "120px"}}>Create Product</Button></Nav.Link>
        <Nav.Link href={LIST_PRODUCTS_PATH}><Button variant='outline-primary' style={{width: "120px"}}>List Products</Button></Nav.Link>
        <Nav.Link href={ADD_WORKER_PATH}><Button variant='outline-primary' style={{width: "120px"}}>Add Worker</Button></Nav.Link>
        <Nav.Link href={LIST_WORKERS}><Button variant='outline-primary' style={{width: "120px"}}>List Workers</Button></Nav.Link>
        <Nav.Link><Button variant='outline-danger' style={{width: "120px"}} onClick={() => logoutButtonHandler()}>Logout</Button></Nav.Link>
    </Nav>
  )
}
