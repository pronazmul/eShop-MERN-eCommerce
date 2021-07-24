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
import CartScreen from './components/screens/CartScreen'
import RegistrationScreen from './components/screens/RegistrationScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import ShippingScreen from './components/screens/ShippingScreen'
import PaymentScreen from './components/screens/PaymentScreen'
import PlaceOrderScreen from './components/screens/PlaceOrderScreen'
import OrderScreen from './components/screens/OrderScreen'
import UserListScreen from './components/screens/UserListScreen'
import UserEditScreen from './components/screens/UserEditScreen'
import ProductListScreen from './components/screens/ProductListScreen'
import ProductEditScreen from './components/screens/ProductEditScreen'
import OrderListScreen from './components/screens/OrderListScreen'
import ProductDetailsScreen from './components/screens/ProductDetailsScreen'
import SearchProductScreen from './components/screens/SearchProductScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-2'>
          <Switch>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegistrationScreen} />
            <Route path='/product/:id' component={ProductDetailsScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productList' component={ProductListScreen} />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route exact path='/' component={HomeScreen} />
            <Route
              exact
              path='/search-result'
              component={SearchProductScreen}
            />
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
