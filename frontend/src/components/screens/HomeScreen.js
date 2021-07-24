import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from '../../redux/actions/productActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import PaginationElement from '../uiElements/PaginationElement'
import Product from '../uiElements/Product'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { pageNumber } = useParams()

  const { loading, error, products, pages, currentPage } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    dispatch(productListAction('', pageNumber, 2))
  }, [dispatch, pageNumber])

  return (
    <>
      <Row className=''>
        <h1 className='text-align-center'>Latest Products</h1>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center'>
            <PaginationElement pages={pages} currentPage={currentPage} />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
