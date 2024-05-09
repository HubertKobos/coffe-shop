import { Button, Nav } from 'react-bootstrap'
import { CART_PAGE_PATH, MAIN_PAGE_PATH } from '../consts/consts'

export default function Header() {
  return (
    <Nav className='flex-column' >
        <Nav.Link href={MAIN_PAGE_PATH}><Button variant='outline-primary' style={{width: "120px"}}>Offer</Button></Nav.Link>
        <Nav.Link href={CART_PAGE_PATH}><Button variant='outline-primary' style={{width: "120px"}}>Cart</Button></Nav.Link>
    </Nav>
  )
}
