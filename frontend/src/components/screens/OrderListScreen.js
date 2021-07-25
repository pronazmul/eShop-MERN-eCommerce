import React, { useEffect } from 'react'
import { Row, Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { orderListAction } from './../../redux/actions/orderActions'

const OrderListScreen = () => {
  document.title = 'eShop | Manage Orders'
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, orders } = useSelector((state) => state.orderList)

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(orderListAction())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history])

  return (
    <>
      <Row className='my-3 align-items-center'>
        <Col>
          <h2>Orders</h2>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          orders && (
            <Table responsive striped bordered hover size='lg'>
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>ID</th>
                  <th>BUYER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td className='text-center'>{order.user.name}</td>
                    <td className='text-center'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='text-center'>${order.totalPrice}</td>
                    <td className='text-center'>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td className='text-center'>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </Row>
    </>
  )
}

export default OrderListScreen
