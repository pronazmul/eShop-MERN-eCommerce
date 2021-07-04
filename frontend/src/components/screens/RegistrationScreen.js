import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({})
  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(formData))
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
              <h2>Registration Form</h2>
            </Card.Header>
            <Card.Body className='mx-2'>
              <Form>
                <Form.Group controlId='name'>
                  <Form.Control
                    type='text'
                    name='name'
                    onBlur={handleBlur}
                    placeholder='Enter name'
                    required
                  />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Control
                    type='email'
                    onBlur={handleBlur}
                    name='email'
                    placeholder='Enter email'
                    required
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Control
                    type='password'
                    onBlur={handleBlur}
                    name='password'
                    placeholder='Password'
                    required
                  />
                </Form.Group>
                <Button type='submit' className='btn btn-blue my-3 btn-block'>
                  register
                </Button>
              </Form>
              Already have account? <Link to='/login'>Login</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationScreen
