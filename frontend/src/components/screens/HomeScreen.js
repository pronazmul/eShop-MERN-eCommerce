import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from '../../redux/actions/productActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import Product from '../uiElements/Product'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListAction())
  }, [dispatch])

  const { loading, error, products } = useSelector((state) => state.productList)

  return (
    <>
      <Row className=''>
        <h1 className='text-align-center'>Latest Products</h1>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
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
