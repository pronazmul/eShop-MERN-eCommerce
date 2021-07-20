import React, { useEffect } from 'react'
import { Row, Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { productListAction } from './../../redux/actions/productActions'

const ProductListScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, products } = useSelector((state) => state.productList)

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(productListAction())
    } else {
      history.push('/')
    }
  }, [dispatch, userInfo, history])

  const productDeleteHandler = (id) => {
    window.confirm('Are you sure!')
  }

  return (
    <>
      <Row className='my-3 align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='btn-blue'>
            <i className='fas fa-plus'></i> Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table responsive striped bordered hover size='lg'>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-auto'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      onClick={() => productDeleteHandler(product._id)}
                      className='btn-sm mx-auto ml-1'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </>
  )
}

export default ProductListScreen
