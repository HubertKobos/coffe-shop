import React, { useState } from 'react'
import "../../../assets/css/modal.css"
import { useAppSelector } from '../../../../hooks'
import { COMPLETE_ORDER_MODAL_TIME } from '../../consts/consts'


export default function OrderCompletedModal() {
    const time = useAppSelector((state) => state.cart.time)
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className="modal-content-inner">
          {COMPLETE_ORDER_MODAL_TIME - time}s
          <h2>Order Completed</h2>
          <p>Your order has been successfully completed!</p>
        </div>
      </div>
    </div>
  )
}
