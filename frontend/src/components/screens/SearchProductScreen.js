import React, { useEffect } from 'react'
import { Alert, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from '../../redux/actions/productActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import Product from '../uiElements/Product'
import { useParams } from 'react-router-dom'
import PaginationElement from '../uiElements/PaginationElement'

const SearchProductScreen = () => {
  document.title = 'eShop | Search'
  const dispatch = useDispatch()
  const { keyword, pageNumber } = useParams()

  const { loading, error, products, pages, currentPage, count } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    if (keyword) {
      dispatch(productListAction(keyword, pageNumber, 2))
    }
  }, [dispatch, keyword, pageNumber])

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products && count > 0 ? (
        <>
          <Row>
            <Alert variant='light'>
              <Row>
                <Col className='text-bolder'>
                  {count} items found for "{keyword}"
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
          <div className='d-flex justify-content-center'>
            <PaginationElement
              pages={pages}
              currentPage={currentPage}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      ) : (
        <Image
          className='d-block mx-auto'
          style={{ height: '80vh' }}
          src='/images/noproduct.png'
          alt='No Product'
        />
      )}
    </Container>
  )
}

export default SearchProductScreen
