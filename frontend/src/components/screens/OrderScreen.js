import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderDetailsAction } from './../../redux/actions/orderActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const { loading, error, order } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(orderDetailsAction(id))
    }
  }, [id, order])

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
                <Message variant='success'>Paid </Message>
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
                        <Image src={item.image} alt={item.name} fluid rounded />
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
            <ListGroup.Item className='text-center'>
              <Button className='btn btn-block btn-blue mt-3'>PAY NOW</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
