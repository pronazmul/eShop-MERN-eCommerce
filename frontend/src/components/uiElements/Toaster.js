import React, { useState } from 'react'
import { Row, Col, Toast } from 'react-bootstrap'

const Toaster = () => {
  const [show, setShow] = useState(true)

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className='me-auto'>Header</strong>
          </Toast.Header>
          <Toast.Body>Body</Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}

export default Toaster
