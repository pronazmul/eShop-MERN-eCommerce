import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import updateSchema from '../yupSchemas/updateSchema'
import { userDetailsAction } from '../../redux/actions/userActions'

const UserEditScreen = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.userDetails)
  console.log(user)

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
              <Formik
                initialValues={{
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }}
                validationSchema={updateSchema}
                onSubmit={(values) => {
                  alert(JSON.stringify(values))
                }}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Control
                        name='name'
                        type='name'
                        onChange={handleChange}
                        value={values.name}
                        isValid={values.name.length !== 0 && !errors.name}
                        isInvalid={values.name.length !== 0 && errors.name}
                      />
                      {values.name.length !== 0 && errors.name && (
                        <Form.Text className='text-danger'>
                          {errors.name}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        name='email'
                        type='email'
                        onChange={handleChange}
                        value={values.email}
                        isValid={values.email.length !== 0 && !errors.email}
                        isInvalid={values.email.length !== 0 && errors.email}
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
                    <Button
                      type='submit'
                      className='btn btn-blue my-3 btn-block'
                    >
                      UPDATE
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        )}
      </FormWrapper>
    </>
  )
}

export default UserEditScreen
