import React, { useEffect } from 'react'
import { Alert, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productSearchAction } from '../../redux/actions/productActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import Product from '../uiElements/Product'
import { useLocation } from 'react-router-dom'

const SearchProductScreen = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchQuery = location.search ? location.search.split('=')[1] : ''

  const { loading, products, error } = useSelector(
    (state) => state.productSearch
  )

  useEffect(() => {
    if (searchQuery) {
      dispatch(productSearchAction(searchQuery))
    }
  }, [dispatch, searchQuery])

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products && products.length > 0 ? (
        <>
          <Row>
            <Alert variant='light'>
              <Row>
                <Col className='text-bolder'>
                  {products.length} items found for "{searchQuery}"
                </Col>
                <Col className='text-bolder text-end'>
                  <Form.Group as={Row} className='align-items-center'>
                    <Col>
                      <Form.Label>Filter By:</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control as='select'>
                        <option value='1'>Best Match</option>
                        <option value='2'>Low To Heigh</option>
                        <option value='3'>Heigh To Low</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Alert>
          </Row>
          <Row>
            {products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Image
          className='d-block mx-auto'
          style={{ height: '80vh' }}
          src='images/noproduct.png'
          alt='No Product'
        />
      )}
    </Container>
  )
}

export default SearchProductScreen
