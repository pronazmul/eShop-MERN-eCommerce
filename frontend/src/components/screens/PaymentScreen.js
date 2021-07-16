import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { savePaymentMethodAction } from '../../redux/actions/cartActions'

const PaymentScreen = () => {
  const history = useHistory()
  const { shippingAddress } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!shippingAddress.address) {
      history.push('/shipping')
    }
  }, [shippingAddress])

  const [paymentMethod, setPaymentMethod] = useState('payPal')
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethodAction(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormWrapper>
      <CheckoutSteps step1 step2 step3 />
      <Card>
        <Card.Header className='text-center'>
          <h2>Payment Method</h2>
        </Card.Header>
        <Card.Body className='mx-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className='my-3 mx-auto'>
              <Form.Label as='legend' column sm={4}>
                Pay With
              </Form.Label>
              <Col sm={6}>
                <Form.Check
                  className='mb-2'
                  type='radio'
                  label='Paypal or Creadit Card'
                  name='paymentMethod'
                  id='payPal'
                  value='payPal'
                  checked={paymentMethod === 'payPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  className='mb-2'
                  type='radio'
                  label='SslCommerz'
                  name='paymentMethod'
                  id='sslCommerz'
                  value='sslCommerz'
                  checked={paymentMethod === 'sslCommerz'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type='radio'
                  label='Stripe'
                  name='paymentMethod'
                  id='stripe'
                  value='stripe'
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
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

export default PaymentScreen
