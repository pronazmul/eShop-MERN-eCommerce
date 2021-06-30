import React from 'react'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './components/screens/home/HomeScreen'
import ProductScreen from './components/screens/product/ProductScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import CartScreen from './components/screens/cart/CartScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-2'>
          <Switch>
            <Route exact path='/'>
              <HomeScreen />
            </Route>
            <Route path='/product/:id'>
              <ProductScreen />
            </Route>
            <Route path='/cart/:id?'>
              <CartScreen />
            </Route>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </main>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
