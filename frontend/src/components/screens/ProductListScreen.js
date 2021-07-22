import React, { useEffect } from 'react'
import { Row, Table, Button, Col, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import {
  productCreateAction,
  productDeleteAction,
  productListAction,
} from './../../redux/actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../../redux/constants/productConstants'

const ProductListScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, products } = useSelector((state) => state.productList)
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.productDelete)

  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    product: createdProduct,
  } = useSelector((state) => state.productCreate)

  useEffect(() => {
    if ((userInfo && userInfo.role === 'admin') || !products || deleteSuccess) {
      dispatch(productListAction())
    } else {
      history.push('/login')
    }
    if (createSuccess) {
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [
    dispatch,
    userInfo,
    history,
    deleteSuccess,
    createSuccess,
    createdProduct,
  ])

  const productDeleteHandler = (id) => {
    if (window.confirm('Are you sure!')) {
      dispatch(productDeleteAction(id))
    }
  }

  const productCreateHandler = () => {
    dispatch(productCreateAction())
  }

  return (
    <>
      <Row className='my-3 align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='btn-blue' onClick={productCreateHandler}>
            <i className='fas fa-plus'></i> Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        {deleteError && <Message variant='danger'>{deleteError}</Message>}
        {createError && <Message variant='danger'>{createError}</Message>}
        {loading || deleteLoading || createLoading ? (
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
                  <td className='text-center'>
                    <ButtonGroup>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        onClick={() => productDeleteHandler(product._id)}
                        className='btn-sm'
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </ButtonGroup>
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
