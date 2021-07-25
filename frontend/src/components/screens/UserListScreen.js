import React, { useEffect } from 'react'
import { Row, Table, Button, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import {
  userDeleteAction,
  userListAction,
} from '../../redux/actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { USER_LIST_RESET } from './../../redux/constants/userConstants'

const UserListScreen = () => {
  document.title = 'eShop | Manage Users'
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, users } = useSelector((state) => state.userList)
  const { success: userDeleteSuccess } = useSelector(
    (state) => state.userDelete
  )

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch({ type: USER_LIST_RESET })
      dispatch(userListAction())
    } else {
      history.push('/')
    }
  }, [dispatch, userDeleteSuccess, userInfo, history])

  const userDeleteHandler = (id) => {
    if (window.confirm('Are you sure!')) {
      dispatch(userDeleteAction(id))
    }
  }

  return (
    <>
      <Row>
        <h3 className='my-2'>Users</h3>
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.role}</td>
                  <td className='text-center'>
                    <ButtonGroup>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        onClick={() => userDeleteHandler(user._id)}
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

export default UserListScreen
