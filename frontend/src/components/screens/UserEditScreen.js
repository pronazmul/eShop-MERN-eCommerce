import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import updateSchema from '../yupSchemas/updateSchema'
import { userDetailsAction } from '../../redux/actions/userActions'
import { USER_DETAILS_RESET } from '../../redux/constants/userConstants'

const UserEditScreen = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.userDetails)

  const formik = useFormik({
    initialValues: {
      name: user.name ? user.name : '',
      email: user.email ? user.email : '',
      role: user.role ? user.role : 'user',
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      history.push('/admin/userlist')
    },
  })
  const { handleChange, handleBlur, handleSubmit, errors, values } = formik

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(userDetailsAction(id))
    }
  }, [dispatch, user, id])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-blue'>
        Go Back
      </Link>
      <FormWrapper>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Card>
            <Card.Header className='text-center'>
              <h2>Update User</h2>
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
                    isValid={values.name.length !== 0 && !errors.name}
                    isInvalid={values.name.length !== 0 && errors.name}
                    required
                  />
                  {values.name.length !== 0 && errors.name && (
                    <Form.Text className='text-danger'>{errors.name}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name='email'
                    type='email'
                    placeholder='Enter email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isValid={values.email.length !== 0 && !errors.email}
                    isInvalid={values.email.length !== 0 && errors.email}
                    required
                  />
                  {values.email.length !== 0 && errors.email && (
                    <Form.Text className='text-danger'>
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Row} className='mt-4 mx-auto'>
                  <Form.Label as='legend' column sm={3}>
                    Role
                  </Form.Label>
                  <Col>
                    <Form.Check
                      className='mb-2'
                      type='radio'
                      label='USER'
                      name='role'
                      id='USER'
                      value='user'
                      checked={values.role === 'user'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      className='mb-2'
                      type='radio'
                      label='ADMIN'
                      name='role'
                      id='ADMIN'
                      value='admin'
                      checked={values.role === 'admin'}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Button type='submit' className='btn btn-blue my-3 btn-block'>
                  UPDATE
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </FormWrapper>
    </>
  )
}

export default UserEditScreen
