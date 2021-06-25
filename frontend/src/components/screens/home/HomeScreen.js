import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Products from '../../dummyData'
import Product from './Product'
const HomeScreen = () => {
  return (
    <>
      <Row>
        <h1 className='text-align-center'>Latest Products</h1>
      </Row>
      <Row>
        {Products.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
