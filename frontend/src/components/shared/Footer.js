import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-2 font-weight-bolder'>
            Copyright &copy; eShop 2021
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
