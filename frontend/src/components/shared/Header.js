import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
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
            <Nav>
              <Link className='btn btn-md btn-midium' to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Link>
              <Link className='btn btn-md btn-midium' to='/login'>
                <i className='fas fa-user'></i> Sign In
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
