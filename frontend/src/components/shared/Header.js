import React, { useState } from 'react'
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  FormControl,
  InputGroup,
  Row,
  Col,
  Badge,
  Button,
  Form,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { logoutAction } from '../../redux/actions/userActions'

const Header = () => {
  const history = useHistory()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((item) => item.cart)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutAction())
  }
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/${searchQuery}`)
    setSearchQuery('')
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
        <Container as={Row} fluid>
          <Col xs={3} sm={2} md={2} lg={2}>
            <Link className='text-decoration-none' to='/'>
              <Navbar.Brand className='header-logo'>eShop</Navbar.Brand>
            </Link>
          </Col>
          <Col xs={7} sm={8} md={5} lg={6}>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <FormControl
                  type='text'
                  name='searchQuery'
                  placeholder='Search in eShop'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant='outline-primary' type='submit'>
                  <i className='fas fa-search text-light'></i>
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col xs={2} sm={2} md={5} lg={4}>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
              id='basic-navbar-nav'
              className='d-flex justify-content-around'
            >
              <Nav>
                <IndexLinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart mr-2'></i>
                    {cartItems && cartItems.length ? (
                      <sup>
                        <Badge bg='warning'>{cartItems.length}</Badge>
                      </sup>
                    ) : (
                      ''
                    )}
                  </Nav.Link>
                </IndexLinkContainer>
                {userInfo ? (
                  <>
                    <Image
                      src={`/uploads/avatars/${userInfo.avatar}`}
                      roundedCircle
                      width='40'
                      height='40'
                    />
                    <NavDropdown title={userInfo.name} id='name'>
                      <IndexLinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </IndexLinkContainer>
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <IndexLinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </IndexLinkContainer>
                )}

                {userInfo && userInfo.role === 'admin' && (
                  <NavDropdown title='Admin' id='admin'>
                    <IndexLinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>User List</NavDropdown.Item>
                    </IndexLinkContainer>
                    <IndexLinkContainer to='/admin/productList'>
                      <NavDropdown.Item>Product List</NavDropdown.Item>
                    </IndexLinkContainer>
                    <IndexLinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Order List</NavDropdown.Item>
                    </IndexLinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
