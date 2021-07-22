import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { logoutAction } from '../../redux/actions/userActions'

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Link className='text-decoration-none' to='/'>
            <Navbar.Brand className='header-logo'>eShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <Nav className='align-items-center'>
              <IndexLinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </IndexLinkContainer>

              {userInfo ? (
                <>
                  <Image
                    src={`uploads/avatars/${userInfo.avatar}`}
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
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
