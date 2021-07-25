import React, { useEffect } from 'react'
import { Button, Carousel, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productTopAction } from '../../redux/actions/productActions'
import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state) => state.ProductTopRated
  )
  useEffect(() => {
    dispatch(productTopAction())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-dark rounded my-3'
      controls={false}
      interval='2000'
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link className='text-decoration-none' to={`/product/${product._id}`}>
            <Row className='p-5 align-items-center text-light'>
              <Col md={7}>
                <h1>{product.name}</h1>
                <p className='lead'>{product.description}</p>
                <h3>${product.price}</h3>
                <Button className='btn-blue'>Buy Now</Button>
              </Col>
              <Col md={5}>
                <Image
                  src={`/uploads/products/${product.image}`}
                  alt={product.name}
                  className='w-100'
                  rounded
                />
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel

{
  /* <div class="row align-items-center">
                    <div class="col-md-7">
                        <h1>Mi LED TV 4A PRO 32</h1>
                        <p class="lead">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                        <h1 class="price">$1280</h1>
                        <button class=" btn buy-now-btn">Buy Now</button>
                    </div>
                    <div class="col-md-5">
                        <img src="images/banner-images/tv.png" class="d-block w-100" alt="...">
                    </div>
                </div> */
}
