import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'

const LoginScreen = () => {
  const [formData, setFormData] = useState({})
  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
  }

  const handleBlur = (e) => {
    const newData = { ...formData }
    newData[e.target.name] = e.target.value
    setFormData(newData)
  }

  return (
    <Container
      style={{ height: '80vh' }}
      className='d-flex flex-row justify-content-center align-items-center'
    >
      <Row className='w-100'>
        <Col lg={6} md={12} sm={12} className='mx-auto'>
          <Card>
            <Card.Header className='text-center'>
              <h2>Login Form</h2>
            </Card.Header>
            <Card.Body className='mx-2'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                  <Form.Control
                    onBlur={handleBlur}
                    name='email'
                    type='email'
                    placeholder='Enter email'
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Control
                    onBlur={handleBlur}
                    name='password'
                    type='password'
                    placeholder='Password'
                  />
                </Form.Group>
                <Button type='submit' className='btn btn-blue my-3 btn-block'>
                  Login
                </Button>
              </Form>
              Don't have account? <Link to='/register'>Resister</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
