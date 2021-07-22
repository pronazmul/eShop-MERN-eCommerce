import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormWrapper = ({ children }) => {
  return (
    <Container
      style={{ minHeight: '80vh' }}
      className='d-flex flex-row justify-content-center align-items-center'
    >
      <Row className='w-100'>
        <Col lg={8} md={12} sm={12} className='mx-auto'>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormWrapper
