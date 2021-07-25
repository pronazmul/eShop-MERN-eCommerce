import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Form, Image } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import {
  productDetailsAction,
  productUpdateAction,
} from '../../redux/actions/productActions'
import productSchema from '../yupSchemas/productSchema'
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../redux/constants/productConstants'

const ProductEditScreen = () => {
  document.title = 'eShop | Edit Product'
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  )
  const {
    loading: updateLoader,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.productUpdate)

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/productList')
    } else {
      if (!product || product._id !== id) {
        dispatch(productDetailsAction(id))
      }
    }
  }, [dispatch, product, id, history, updateSuccess])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-blue'>
        Go Back
      </Link>
      <FormWrapper>
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading || updateLoader ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : product ? (
          <Card>
            <Card.Header className='text-center'>
              <h2>Edit Product</h2>
            </Card.Header>
            <Card.Body className='mx-2'>
              <Formik
                initialValues={{
                  name: product.name,
                  price: product.price,
                  image: null,
                  brand: product.brand,
                  category: product.category,
                  countInStock: product.countInStock,
                  description: product.description,
                }}
                validationSchema={productSchema}
                onSubmit={(values) => {
                  let formData = new FormData()
                  formData.append('name', values.name)
                  formData.append('price', values.price)
                  formData.append('brand', values.brand)
                  formData.append('category', values.category)
                  formData.append('countInStock', values.countInStock)
                  formData.append('description', values.description)
                  if (values.image) {
                    formData.append('image', values.image)
                  }

                  dispatch(productUpdateAction(product._id, formData))
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Product
                      </Form.Label>
                      <Col>
                        <Form.Control
                          name='name'
                          type='name'
                          onChange={handleChange}
                          value={values.name}
                          isValid={!errors.name}
                          isInvalid={errors.name}
                        />
                      </Col>
                      {errors.name && (
                        <Form.Text className='text-danger'>
                          {errors.name}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Price
                      </Form.Label>
                      <Col>
                        <Form.Control
                          name='price'
                          type='text'
                          onChange={handleChange}
                          value={values.price}
                          isValid={!errors.price}
                          isInvalid={errors.price}
                        />
                      </Col>
                      {errors.price && (
                        <Form.Text className='text-danger'>
                          {errors.price}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label
                        htmlFor='image'
                        column
                        sm={3}
                        style={{ cursor: 'pointer' }}
                      >
                        <p className='m-0 '>
                          <i className='fas fa-cloud-upload-alt'></i>{' '}
                          <span>Upload</span>
                        </p>
                      </Form.Label>
                      <Col>
                        <Form.Control
                          id='image'
                          name='image'
                          type='file'
                          className='d-none'
                          onChange={(event) =>
                            setFieldValue('image', event.target.files[0])
                          }
                        />
                        <Image
                          src={
                            values.image
                              ? URL.createObjectURL(values.image)
                              : `/uploads/products/${product.image}`
                          }
                          alt='Product'
                          height='80'
                          width='80'
                          className='my-2'
                          rounded
                        />
                      </Col>
                      {errors.image && (
                        <Form.Text className='text-danger'>
                          {errors.image}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Brand
                      </Form.Label>
                      <Col>
                        <Form.Control
                          name='brand'
                          type='text'
                          onChange={handleChange}
                          value={values.brand}
                          isValid={!errors.brand}
                          isInvalid={errors.brand}
                        />
                      </Col>
                      {errors.brand && (
                        <Form.Text className='text-danger'>
                          {errors.brand}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Category
                      </Form.Label>
                      <Col>
                        <Form.Control
                          name='category'
                          type='text'
                          onChange={handleChange}
                          value={values.category}
                          isValid={!errors.category}
                          isInvalid={errors.category}
                        />
                      </Col>
                      {errors.category && (
                        <Form.Text className='text-danger'>
                          {errors.category}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Quantity
                      </Form.Label>
                      <Col>
                        <Form.Control
                          name='countInStock'
                          type='text'
                          onChange={handleChange}
                          value={values.countInStock}
                          isValid={!errors.countInStock}
                          isInvalid={errors.countInStock}
                        />
                      </Col>
                      {errors.countInStock && (
                        <Form.Text className='text-danger'>
                          {errors.countInStock}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label column sm={3}>
                        Description
                      </Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={2}
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                        isValid={!errors.description}
                        isInvalid={errors.description}
                      />
                      {errors.description && (
                        <Form.Text className='text-danger'>
                          {errors.description}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Button
                      type='submit'
                      className='btn btn-blue my-3 btn-block'
                    >
                      UPDATE
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        ) : (
          <Loader />
        )}
      </FormWrapper>
    </>
  )
}

export default ProductEditScreen
