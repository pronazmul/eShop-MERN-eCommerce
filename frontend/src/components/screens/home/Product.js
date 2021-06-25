import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card style={{ overflow: 'hidden' }} className='my-3 rounded'>
      <a href={`/product/${product._id}`} className='text-decoration-none'>
        <Card.Img className='product-img' variant='top' src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text as='div' className='my-2'>
            <Rating
              rating={product.rating}
              review={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as='h6'>${product.price}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  )
}

export default Product
