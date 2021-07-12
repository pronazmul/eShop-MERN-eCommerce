import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

const Toaster = ({ variant = 'success', message }) => {
  const [show, setShow] = useState(true)

  return (
    <Toast
      className='d-inline-block my-2'
      bg={variant}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default Toaster
