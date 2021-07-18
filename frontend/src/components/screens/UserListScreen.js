import React, { useEffect } from 'react'
import { Row, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import { userListAction } from '../../redux/actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userListAction())
  }, [dispatch])

  const { loading, error, users } = useSelector((state) => state.userList)

  const userDeleteHandler = (id) => alert(`Deleted Succesfully ${id}`)

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
          <Table responsive striped bordered hover size='md'>
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
                    <a target='_blank' href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-auto'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      onClick={() => userDeleteHandler(user._id)}
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

export default UserListScreen
