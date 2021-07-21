import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import FormWrapper from '../uiElements/FormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { productDetailsAction } from '../../redux/actions/productActions'
import productSchema from '../yupSchemas/productSchema'

const ProductEditScreen = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  )

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(productDetailsAction(id))
    }
  }, [dispatch, product, id, history])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-blue'>
        Go Back
      </Link>
      <FormWrapper>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : product ? (
          <Card>
            <Card.Header className='text-center'>
              <h2>Update Product</h2>
            </Card.Header>
            <Card.Body className='mx-2'>
              <Formik
                initialValues={{
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  brand: product.brand,
                  category: product.category,
                  countInStock: product.countInStock,
                  description: product.description,
                }}
                validationSchema={productSchema}
                onSubmit={(values) => {
                  alert(JSON.stringify(values))
                  //   dispatch(userUpdateAction(user._id, values))
                }}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                          name='name'
                          type='name'
                          onChange={handleChange}
                          value={values.name}
                          isValid={!errors.name}
                          isInvalid={errors.name}
                        />
                        {errors.name && (
                          <Form.Text className='text-danger'>
                            {errors.name}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          name='price'
                          type='text'
                          onChange={handleChange}
                          value={values.price}
                          isValid={!errors.price}
                          isInvalid={errors.price}
                        />
                        {errors.price && (
                          <Form.Text className='text-danger'>
                            {errors.price}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                          name='image'
                          type='text'
                          onChange={handleChange}
                          value={values.image}
                          isValid={!errors.image}
                          isInvalid={errors.image}
                        />
                        {errors.image && (
                          <Form.Text className='text-danger'>
                            {errors.image}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          name='brand'
                          type='text'
                          onChange={handleChange}
                          value={values.brand}
                          isValid={!errors.brand}
                          isInvalid={errors.brand}
                        />
                        {errors.brand && (
                          <Form.Text className='text-danger'>
                            {errors.brand}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          name='category'
                          type='text'
                          onChange={handleChange}
                          value={values.category}
                          isValid={!errors.category}
                          isInvalid={errors.category}
                        />
                        {errors.category && (
                          <Form.Text className='text-danger'>
                            {errors.category}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          name='countInStock'
                          type='text'
                          onChange={handleChange}
                          value={values.countInStock}
                          isValid={!errors.countInStock}
                          isInvalid={errors.countInStock}
                        />
                        {errors.countInStock && (
                          <Form.Text className='text-danger'>
                            {errors.countInStock}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Row>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
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
