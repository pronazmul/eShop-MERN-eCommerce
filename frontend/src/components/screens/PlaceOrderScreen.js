import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { orderCreateAction } from './../../redux/actions/orderActions'
import { CART_RESET_ITEM } from '../../redux/constants/cartConstants'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart
  const { order, success } = useSelector((state) => state.orderCreate)

  cart.itemsPrice = Number(
    cart.cartItems.reduce((acc, item) => acc + item.price * Number(item.qty), 0)
  ).toFixed(2)
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 50
  cart.taxPrice = Number(cart.itemsPrice * 0.15).toFixed(2)
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  useEffect(() => {
    if (!paymentMethod) {
      history.push('/payment')
    }

    if (success) {
      dispatch({ type: CART_RESET_ITEM })
      history.push(`/order/${order._id}`)
    }
  }, [paymentMethod, success, order, history, dispatch])

  // Order Handler
  const handlePlaceOrder = () => {
    const {
      cartItems: orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      itemsPrice,
    } = cart
    dispatch(
      orderCreateAction({
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8} sm={12}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>SHIPPING</h4>
              <p>
                <strong>Address: </strong>
                {`${shippingAddress.address}, 
                ${shippingAddress.city} ${shippingAddress.postalCode}, 
                ${shippingAddress.country}`}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>PAYMENT METHOD</h4>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
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
              <strong>${cart.itemsPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Shipping:</strong>
              <strong>${cart.shippingPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Tax:</strong>
              <strong>${cart.taxPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between p-3'>
              <strong>Total:</strong>
              <strong>${cart.totalPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <Button
                className='btn btn-block btn-blue mt-3'
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
