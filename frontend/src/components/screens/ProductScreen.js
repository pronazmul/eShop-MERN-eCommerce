import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Image,
  Row,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
} from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import Rating from '../uiElements/Rating'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { productDetailsAction } from '../../redux/actions/productActions'

const ProductScreen = () => {
  const history = useHistory()
  const { id } = useParams()
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(productDetailsAction(id))
  }, [id, dispatch])

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  )
  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }
  return (
    <>
      <Link className='btn btn-md btn-blue btn-primary my-2' to='/'>
        Back to home
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col
            className='px-1 d-flex justify-content-center align-items-center'
            md={5}
          >
            <Image
              style={{ width: '90%', height: '90%' }}
              src={product.image}
              alt={product.name}
              rounded
            />
          </Col>
          <Col md={7} className='px-0'>
            <ListGroup className='rounded py-4'>
              <Row>
                <Col md={7}>
                  <ListGroupItem className='py-2'>
                    <h4>{product.name}</h4>
                  </ListGroupItem>
                  <ListGroupItem className='py-2'>
                    <Rating
                      rating={product.rating}
                      review={`${product.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem className='py-2'>
                    <strong>Price: ${product.price}</strong>
                  </ListGroupItem>
                  <ListGroupItem className='py-2'>
                    <p className='text-muted text-align-justify'>
                      {product.description}
                    </p>
                  </ListGroupItem>
                </Col>
                <Col md={5}>
                  <ListGroupItem className='py-2 d-flex justify-content-between'>
                    <strong>Price:</strong>
                    <span className='font-weight-bolder'>
                      $ {product.price}
                    </span>
                  </ListGroupItem>
                  <ListGroupItem className='py-2 d-flex justify-content-between'>
                    <strong>Stock:</strong>
                    <span className='font-weight-bolder'>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </ListGroupItem>
                  <ListGroupItem className='py-2 d-flex justify-content-between'>
                    <strong>Qty:</strong>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      size='sm'
                      style={{ width: '50%' }}
                      disabled={Boolean(!product.countInStock)}
                    >
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </ListGroupItem>
                  <ListGroupItem className=' d-flex justify-content-center'>
                    <Link
                      className={`btn btn-md btn-blue btn-primary mb-2 ${
                        product.countInStock < 1 && 'disabled'
                      }`}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Link>
                  </ListGroupItem>
                </Col>
              </Row>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
