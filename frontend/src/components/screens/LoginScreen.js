import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import loginSchema from '../yupSchemas/loginSchema'
import FormWrapper from '../uiElements/FormWrapper'

const LoginScreen = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const { handleChange, handleBlur, handleSubmit, touched, errors, values } =
    formik

  return (
    <FormWrapper>
      <Card>
        <Card.Header className='text-center'>
          <h2>Login Form</h2>
        </Card.Header>
        <Card.Body className='mx-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
            </Form.Group>
            <Button type='submit' className='btn btn-blue my-3 btn-block'>
              Login
            </Button>
          </Form>
          Don't have account? <Link to='/register'>Resister</Link>
        </Card.Body>
      </Card>
    </FormWrapper>
  )
}

export default LoginScreen
