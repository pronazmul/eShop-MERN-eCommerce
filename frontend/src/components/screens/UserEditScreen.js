import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import updateSchema from '../yupSchemas/updateSchema'
import {
  userDetailsAction,
  userUpdateAction,
} from '../../redux/actions/userActions'
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from '../../redux/constants/userConstants'

const UserEditScreen = () => {
  document.title = 'eShop | Edit User'
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.userDetails)
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch({ type: USER_DETAILS_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user || user._id !== id) {
        dispatch(userDetailsAction(id))
      }
    }
  }, [dispatch, user, id, history, updateSuccess])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-blue'>
        Go Back
      </Link>
      <FormWrapper>
        {loading || updateLoading ? (
          <Loader />
        ) : error || updateError ? (
          <Message variant='danger'>{error || updateError}</Message>
        ) : user ? (
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
                  console.log(values)
                  dispatch(userUpdateAction(user._id, values))
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
                        isValid={!errors.name}
                        isInvalid={errors.name}
                      />
                      {errors.name && (
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
                        isValid={!errors.email}
                        isInvalid={errors.email}
                      />
                      {errors.email && (
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
        ) : (
          <Loader />
        )}
      </FormWrapper>
    </>
  )
}

export default UserEditScreen
