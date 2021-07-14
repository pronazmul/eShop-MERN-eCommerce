import React from 'react'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import HomeScreen from './components/screens/HomeScreen'
import LoginScreen from './components/screens/LoginScreen'
import ProductScreen from './components/screens/ProductScreen'
import CartScreen from './components/screens/CartScreen'
import RegistrationScreen from './components/screens/RegistrationScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import ShippingScreen from './components/screens/ShippingScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-2'>
          <Switch>
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegistrationScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/' component={HomeScreen} />
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
