import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from './Product'
import axios from 'axios'

const HomeScreen = () => {
  const [Products, setProducts] = useState([])
  console.log(Products)
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProduct()
  }, [])

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
