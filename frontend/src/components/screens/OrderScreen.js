import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  orderDeliverAction,
  orderDetailsAction,
  orderPayAction,
} from './../../redux/actions/orderActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import axios from 'axios'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../redux/constants/orderConstants'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()

  // @REQUIRED DATA FROM REDUX:
  const { loading, error, order } = useSelector((state) => state.orderDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  )
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  )

  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }

    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(orderDetailsAction(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [id, history, dispatch, order, successPay, successDeliver])

  // Paypal Payment Success Handler:
  const successPaymentHandler = (paymentResult) => {
    dispatch(orderPayAction(id, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8} sm={12}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>SHIPPING</h4>
              <p className='m-0'>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p className='m-0'>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p className='m-0'>
                <strong>Address: </strong>
                {`${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>PAYMENT METHOD</h4>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant='success'>Paid {order.paidAt} </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
              <ListGroup variant='flush'>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row className='d-flex justify-content-center align-items-center'>
                      <Col xs={1}>
                        <Image
                          src={`/uploads/products/${item.image}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col xs={7}>
                        <Link
                          className='text-decoration-none'
                          to={`/product/${item.product}`}
                        >
                          <h6>{item.name}</h6>
                        </Link>
                      </Col>
                      <Col xs={4}>
                        {`${item.qty} x ${item.price} = $${(
                          Number(item.qty) * item.price
                        ).toFixed(2)}`}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} sm={12}>
          <ListGroup>
            <ListGroup.Item className='text-center py-3'>
              <h4>ORDER SUMMARY</h4>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Items:</strong>
              <strong>${order.itemsPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Shipping:</strong>
              <strong>${order.shippingPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Tax:</strong>
              <strong>${order.taxPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Total:</strong>
              <strong>${order.totalPrice}</strong>
            </ListGroup.Item>
            {userInfo && !userInfo.role === 'admin' && !order.isPaid && (
              <ListGroup.Item className='text-center'>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
            {userInfo &&
              userInfo.role === 'admin' &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className='text-center'>
                  <Button
                    onClick={() => dispatch(orderDeliverAction(order._id))}
                  >
                    Confirm As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
