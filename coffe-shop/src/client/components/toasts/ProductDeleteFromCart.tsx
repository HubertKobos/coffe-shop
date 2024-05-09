import React, {useState} from 'react'

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

type ToastProps = {
    show: boolean
}

export default function ProductDeletedFromCart({show}: ToastProps) {

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position"
      >
        <ToastContainer

        style={{width: "15rem"}}
        >
          <Toast show={show}>
            <Toast.Header closeButton={false}>
            
              <strong className="me-auto">Information</strong>
              <small>right now</small>
            </Toast.Header>
            <Toast.Body>Product removed from the cart !</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  )
}
