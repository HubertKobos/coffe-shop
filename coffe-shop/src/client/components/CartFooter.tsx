import { Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { hideShowOrderPlacedModal, placeOrder, timeUp } from '../../features/cart/cartSlice'
import { COMPLETE_ORDER_MODAL_TIME, MAIN_PAGE_PATH } from '../consts/consts'
import { useNavigate } from 'react-router-dom'

export default function CartFooter() {
    const {productsSum} = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const completeOrderHandler = () =>{
        // here it should send to the backend server the oreder so it can be seen in management application
        // if the place order is succesfully send to the backend then we should use placeOrder reducer !!!
        // after a couple of seconds should be hideShowOrderPlacedToast reducer triggered
    
        dispatch(placeOrder())
       
        let time: number = 0
        const interval = setInterval(() =>{
            dispatch(timeUp())
            time += 1 
            if(time >= COMPLETE_ORDER_MODAL_TIME){
              dispatch(hideShowOrderPlacedModal())
              clearInterval(interval)
              navigate(MAIN_PAGE_PATH)
            }
        }, 1000)

      }

  return (
    <div style={{marginTop: "auto", textAlign: "right", paddingRight: "70px" }}>
      <hr/>
      <Button variant="success" style={{ fontSize: "20px" }} onClick={completeOrderHandler}>Complete the order ({productsSum.toFixed(2)}$)</Button>
    </div>
  )
}
