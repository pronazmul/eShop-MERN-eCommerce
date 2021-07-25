import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Form, Button, Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  userDetailsAction,
  userProfileUpdateAction,
} from '../../redux/actions/userActions'
import { USER_PROFILE_UPDATE_RESET } from '../../redux/constants/userConstants'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import updateSchema from './../yupSchemas/updateSchema'
import Toaster from './../uiElements/Toaster'
import { orderListMyAction } from '../../redux/actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
  document.title = 'eShop | Profile'
  const history = useHistory()
  const [avatarPreview, setAvatarPreview] = useState(null)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { success } = useSelector((state) => state.userProfileUpdate)
  const {
    loading: loadingOrder,
    error: errorOrder,
    orders,
  } = useSelector((state) => state.orderListMy)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (!user.name || success) {
      dispatch({ type: USER_PROFILE_UPDATE_RESET })
      dispatch(userDetailsAction('profile'))
      dispatch(orderListMyAction())
    }
  }, [userInfo, dispatch, success, history, user])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col sm={12} md={4}>
            <Card>
              <Card.Header className='text-center'>
                <h2>Update Profile</h2>
              </Card.Header>
              <Card.Body className='mx-2 text-center'>
                {success && (
                  <Toaster variant='success' message='Profile Updated' />
                )}
                <Image
                  src={
                    avatarPreview
                      ? avatarPreview
                      : `uploads/avatars/${user.avatar}`
                  }
                  alt='Profile'
                  height='100'
                  width='100'
                  roundedCircle
                  className='d-block mx-auto shadow p-1 m-2'
                />
                <Formik
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    password: '',
                    confirmPassword: '',
                    avatar: '',
                  }}
                  validationSchema={updateSchema}
                  onSubmit={(values) => {
                    let formData = new FormData()
                    formData.append('name', values.name)
                    formData.append('email', values.email)
                    if (values.avatar) {
                      formData.append('avatar', values.avatar)
                    }
                    if (values.password) {
                      formData.append('password', values.password)
                    }
                    dispatch(userProfileUpdateAction(formData))
                  }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    errors,
                    values,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label
                          htmlFor='avatar'
                          style={{ cursor: 'pointer' }}
                        >
                          <p className='m-0 '>
                            <i className='fas fa-cloud-upload-alt'></i>{' '}
                            <span> Update Photo</span>
                          </p>
                        </Form.Label>
                        <Form.File
                          className='d-none'
                          id='avatar'
                          name='avatar'
                          type='file'
                          onChange={(event) => {
                            setFieldValue('avatar', event.target.files[0])
                            setAvatarPreview(
                              URL.createObjectURL(event.target.files[0])
                            )
                          }}
                        />
                        {errors.avatar && (
                          <Form.Text className='text-danger'>
                            <p className='m-0 '>{errors.avatar}</p>
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          name='name'
                          type='text'
                          onChange={handleChange}
                          value={values.name}
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
                          isInvalid={errors.email}
                        />
                        {errors.email && (
                          <Form.Text className='text-danger'>
                            {errors.email}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          name='password'
                          type='password'
                          placeholder='New Password'
                          onChange={handleChange}
                          value={values.password}
                          isValid={values.password.length && !errors.password}
                          isInvalid={errors.password}
                        />
                        {errors.password && (
                          <Form.Text className='text-danger'>
                            {errors.password}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          name='confirmPassword'
                          type='password'
                          placeholder='Re-Type New Password'
                          onChange={handleChange}
                          value={values.confirmPassword}
                          isValid={
                            values.confirmPassword.length &&
                            !errors.confirmPassword
                          }
                          isInvalid={errors.confirmPassword}
                        />
                        {errors.confirmPassword && (
                          <Form.Text className='text-danger'>
                            {errors.confirmPassword}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Button
                        type='submit'
                        className='btn btn-blue my-3 btn-block'
                      >
                        Update Profile
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={8}>
            <Card>
              <Card.Header className='text-center'>
                <h2>Orders</h2>
              </Card.Header>
              {loadingOrder ? (
                <Loader />
              ) : errorOrder ? (
                <Message variant='danger'>{errorOrder}</Message>
              ) : (
                <Card.Body>
                  <Table responsive striped bordered hover size='md'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item) => (
                        <tr key={item._id} className='text-center'>
                          <td>{item._id}</td>
                          <td>{item.createdAt.substring(0, 10)}</td>
                          <td>${item.totalPrice}</td>
                          <td>
                            {item.isPaid ? (
                              item.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className='fas fa-times'
                                style={{ color: 'red' }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {item.isDelivered ? (
                              item.deliveredAt.substring(0, 10)
                            ) : (
                              <i
                                className='fas fa-times'
                                style={{ color: 'red' }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${item._id}`}>
                              <Button
                                variant='light'
                                className='btn-sm d-block mx-auto'
                              >
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
