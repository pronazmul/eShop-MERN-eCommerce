import React, { useEffect } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../../actions/productActions'
import Product from './Product'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  return (
    <>
      <Row className=''>
        <h1 className='text-align-center'>Latest Products</h1>
      </Row>
      <Row>
        {loading ? (
          <div className='d-flex justify-content-center mt-5'>
            <Spinner animation='grow' />
          </div>
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        ) : (
          products.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={item} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default HomeScreen
