import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Form, Button, Image } from 'react-bootstrap'
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

const ProfileScreen = () => {
  const history = useHistory()
  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { success } = useSelector((state) => state.userProfileUpdate)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (!user.name || success) {
      dispatch({ type: USER_PROFILE_UPDATE_RESET })
      dispatch(userDetailsAction())
    }
  }, [userInfo, dispatch, success])
  //   Formik Data manage & YUP Validation:
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: updateSchema,
    onSubmit: (values, { resetForm }) => {
      if (Object.keys(values).filter((key) => values[key]).length !== 0) {
        if (values.password === values.confirmPassword) {
          let user = Object.keys(values)
            .filter((k) => values[k] != '')
            .reduce((a, k) => ({ ...a, [k]: values[k] }), {})
          dispatch(userProfileUpdateAction(user))
          resetForm()
        } else {
          return false
        }
      } else {
        return false
      }
    },
  })

  const { handleChange, handleSubmit, errors, values } = formik
  console.log(formik)

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
                  src={`uploads/avatars/${user.avatar}`}
                  alt='Profile'
                  height='100'
                  width='100'
                  roundedCircle
                  className='d-block mx-auto shadow p-1 m-2'
                />
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      name='name'
                      type='text'
                      placeholder={user.name}
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
                      placeholder={user.email}
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
                  <Form.Group>
                    <Form.Control
                      name='password'
                      type='password'
                      placeholder='New Password'
                      onChange={handleChange}
                      value={values.password}
                      isValid={values.password.length !== 0 && !errors.password}
                      isInvalid={
                        values.password.length !== 0 && errors.password
                      }
                    />
                    {values.password.length !== 0 && errors.password && (
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
                        values.confirmPassword.length !== 0 &&
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
                  <Button type='submit' className='btn btn-blue my-3 btn-block'>
                    Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={8}>
            <Card>
              <Card.Header className='text-center'>
                <h2>Orders</h2>
              </Card.Header>
              <Card.Body>
                <h4>Nothing Ordered Yet!</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
