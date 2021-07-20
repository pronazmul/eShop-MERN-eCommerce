import React, { useEffect } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import {
  addToCartAction,
  removeFromCartAction,
} from '../../redux/actions/cartActions'
import Message from '../uiElements/Message'

const CartScreen = () => {
  const { id } = useParams()
  const history = useHistory()
  const { search } = useLocation()
  const qty = search ? Number(search.split('=')[1]) : 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addToCartAction(id, qty))
  }, [dispatch, id, qty])

  const { cartItems } = useSelector((item) => item.cart)

  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id))
  }

  const hadleCheckout = () => {
    history.push(`/login?redirect=shipping`)
  }

  return (
    <>
      <h2 className='py-3'>Shopping Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <Row>
          <Message>
            Cart is empty{' '}
            <Link to='/' className='btn btn-md btn-blue'>
              Back to Home
            </Link>
          </Message>
        </Row>
      ) : (
        <Row>
          <Col md={8} sm={12}>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className='d-flex justify-content-center align-items-center py-3'>
                    <Col xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={4}>
                      <Link
                        className='text-decoration-none'
                        to={`/product/${item.product}`}
                      >
                        <h6>{item.name}</h6>
                      </Link>
                    </Col>
                    <Col xs={2}>
                      <strong>${item.price}</strong>
                    </Col>
                    <Col xs={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        className='text-center'
                        onChange={(e) =>
                          dispatch(
                            addToCartAction(item.product, e.target.value)
                          )
                        }
                        size='sm'
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option
                            className='text-center'
                            key={i + 1}
                            value={i + 1}
                          >
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={2}>
                      <Button
                        onClick={() => removeFromCart(item.product)}
                        className='btn btn btn-light  '
                      >
                        <i className='far fa-trash-alt'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='text-center py-3'>
                <h4>
                  SUBTOTAL (
                  {cartItems.reduce(
                    (prev, current) => prev + Number(current.qty),
                    0
                  )}
                  ) ITEMS
                </h4>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-between py-3'>
                <strong>Amount:</strong>
                <strong>
                  ${' '}
                  {cartItems
                    .reduce(
                      (prev, current) => prev + current.price * current.qty,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item className='text-center'>
                <Button
                  className='btn btn-block btn-blue mt-3'
                  disabled={cartItems.length === 0}
                  onClick={hadleCheckout}
                >
                  CHECKOUT 👈
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartScreen
