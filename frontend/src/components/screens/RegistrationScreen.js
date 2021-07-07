import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import loginSchema from '../yupSchemas/loginSchema'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../../redux/actions/userActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'

const RegistrationScreen = () => {
  const history = useHistory()
  const location = useLocation()
  const redirect = location.search ? history.location.search.split('=')[1] : '/'

  const { loading, userInfo, error } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push(`${redirect}`)
    }
  }, [userInfo, redirect, history])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(registerAction(values.name, values.email, values.password))
    },
  })

  const { handleChange, handleBlur, handleSubmit, touched, errors, values } =
    formik

  return (
    <FormWrapper>
      <Card>
        <Card.Header className='text-center'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <h2>Sign Up</h2>
          )}
        </Card.Header>
        <Card.Body className='mx-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name='name'
                type='name'
                placeholder='Enter name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
              />
            </Form.Group>
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
              Register
            </Button>
          </Form>
          Already have have account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Card.Body>
      </Card>
    </FormWrapper>
  )
}

export default RegistrationScreen
