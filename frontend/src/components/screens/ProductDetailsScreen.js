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
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import {
  productCreateReviewAction,
  productDetailsAction,
} from '../../redux/actions/productActions'
import Rating from '../uiElements/Rating'
import { Formik } from 'formik'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants/productConstants'

const ProductDetailsScreen = () => {
  const history = useHistory()
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  const { success: createReviewSuccess, error: createReviewError } =
    useSelector((state) => state.productReviewCreate)

  useEffect(() => {
    if (createReviewSuccess) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(productDetailsAction(id))
  }, [id, dispatch, createReviewSuccess])

  const addToCartHandler = (id, qty) => {
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
        <>
          <span className='d-none'>
            {(document.title = `eShop|${product.name}`)}
          </span>
          <Row>
            <Col
              className='px-1 d-flex justify-content-center align-items-center'
              md={5}
            >
              <Image
                style={{ width: '90%', height: '90%' }}
                src={`/uploads/products/${product.image}`}
                alt={product.image}
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
                        onClick={() => addToCartHandler(id, qty)}
                      >
                        Add to Cart
                      </Link>
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              {product.reviews.length > 0 ? (
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>{' '}
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                <Message variant='light'>No Review Found </Message>
              )}
              {userInfo ? (
                <>
                  {createReviewError && (
                    <Message variant='danger'>{createReviewError}</Message>
                  )}
                  <h4 mt={3}>Write a review </h4>
                  <Formik
                    initialValues={{
                      rating: '',
                      comment: '',
                    }}
                    onSubmit={(values, { resetForm }) => {
                      dispatch(productCreateReviewAction(product._id, values))
                      resetForm()
                    }}
                  >
                    {({ values, handleSubmit, handleChange }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-3 mb-0'>
                          <Form.Label>Rating:</Form.Label>
                          <Form.Control
                            as='select'
                            name='rating'
                            value={values.rating}
                            onChange={handleChange}
                            required
                          >
                            <option value=''>Select Rating...</option>
                            <option value='1'> 1 - Poor</option>
                            <option value='2'> 2 - Fair</option>
                            <option value='3'> 3 - Good</option>
                            <option value='4'> 4 - Very Good</option>
                            <option value='5'> 5 - Excillent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className='mt-4 mb-0'>
                            Comment:
                          </Form.Label>
                          <Form.Control
                            name='comment'
                            value={values.comment}
                            onChange={handleChange}
                            as='textarea'
                            placeholder='Put your comment here'
                            rows={3}
                            required
                          />
                        </Form.Group>
                        <Button type='submit' className='btn-md btn-blue mt-3'>
                          Submit Review
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <Message variant='light'>
                  Please{' '}
                  <Link to='/login' className='text-bold'>
                    Login
                  </Link>{' '}
                  to write a review!
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetailsScreen
