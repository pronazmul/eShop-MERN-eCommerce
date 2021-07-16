import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import shippingSchema from './../yupSchemas/shippingSchema'
import { saveShippingAddressAction } from '../../redux/actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

const ShippingScreen = () => {
  const history = useHistory()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { shippingAddress } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo])

  const formik = useFormik({
    initialValues: {
      address: shippingAddress.address ? shippingAddress.address : '',
      city: shippingAddress.city ? shippingAddress.city : '',
      postalCode: shippingAddress.postalCode ? shippingAddress.postalCode : '',
      country: shippingAddress.country ? shippingAddress.country : '',
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      dispatch(saveShippingAddressAction(values))
      history.push('/payment')
    },
  })

  const { handleChange, handleBlur, handleSubmit, errors, values } = formik

  return (
    <FormWrapper>
      <CheckoutSteps step1 step2 />
      <Card>
        <Card.Header className='text-center'>
          <h2>Shipping</h2>
        </Card.Header>
        <Card.Body className='mx-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name='address'
                type='text'
                placeholder={
                  shippingAddress.address
                    ? shippingAddress.address
                    : 'Enter Address'
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                isValid={values.address.length !== 0 && !errors.address}
                isInvalid={values.address.length !== 0 && errors.address}
                required
              />
              {values.address.length !== 0 && errors.address && (
                <Form.Text className='text-danger'>{errors.address}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                name='city'
                type='text'
                placeholder={
                  shippingAddress.city ? shippingAddress.city : 'Enter City'
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                isValid={values.city.length !== 0 && !errors.city}
                isInvalid={values.city.length !== 0 && errors.city}
                required
              />
              {values.city.length !== 0 && errors.city && (
                <Form.Text className='text-danger'>{errors.city}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                name='postalCode'
                type='text'
                placeholder={
                  shippingAddress.postalCode
                    ? shippingAddress.postalCode
                    : 'Enter Postal Code'
                }
                onChange={handleChange}
                value={values.postalCode}
                isValid={values.postalCode.length !== 0 && !errors.postalCode}
                isInvalid={values.postalCode.length !== 0 && errors.postalCode}
                required
              />
              {values.postalCode.length !== 0 && errors.postalCode && (
                <Form.Text className='text-danger'>
                  {errors.postalCode}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                name='country'
                type='text'
                placeholder={
                  shippingAddress.country
                    ? shippingAddress.country
                    : 'Enter Country'
                }
                onChange={handleChange}
                value={values.country}
                isValid={values.country.length !== 0 && !errors.country}
                isInvalid={values.country.length !== 0 && errors.country}
                required
              />
              {values.country.length !== 0 && errors.country && (
                <Form.Text className='text-danger'>{errors.country}</Form.Text>
              )}
            </Form.Group>
            <Button type='submit' className='btn btn-blue my-3 btn-block'>
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormWrapper>
  )
}

export default ShippingScreen
