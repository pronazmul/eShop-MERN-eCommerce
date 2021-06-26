import React, { useEffect, useState } from 'react'
import { Col, Image, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Rating from '../home/Rating'
import axios from 'axios'
const ProductScreen = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    const singleProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }
    singleProduct()
  }, [])
  return (
    <>
      <Link className='btn btn-outline-primary mb-2' to='/'>
        Back to home
      </Link>
      <Row>
        <Col className='px-1' md={6}>
          <Image src={product.image} alt={product.name} rounded fluid />
        </Col>
        <Col md={6} className='px-0'>
          <ListGroup className='rounded py-4'>
            <Row>
              <Col md={7}>
                <ListGroupItem className='py-1'>
                  <h4>{product.name}</h4>
                </ListGroupItem>
                <ListGroupItem className='py-1'>
                  <Rating
                    rating={product.rating}
                    review={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem className='py-1'>
                  <strong>Price: ${product.price}</strong>
                </ListGroupItem>
                <ListGroupItem className='py-1'>
                  <p className='text-muted text-align-justify'>
                    {product.description}
                  </p>
                </ListGroupItem>
              </Col>
              <Col md={5}>
                <ListGroupItem className='py-1 d-flex justify-content-between'>
                  <strong>Price:</strong>
                  <span className='font-weight-bolder'>$ {product.price}</span>
                </ListGroupItem>
                <ListGroupItem className='py-1 d-flex justify-content-between'>
                  <strong>Stock:</strong>
                  <span className='font-weight-bolder'>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </ListGroupItem>
                <ListGroupItem>
                  <Link className='btn btn-primary mb-2' to='/'>
                    Add to Cart
                  </Link>
                </ListGroupItem>
              </Col>
            </Row>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
