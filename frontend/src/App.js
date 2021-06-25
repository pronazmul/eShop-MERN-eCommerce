import React from 'react'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './components/screens/home/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <HomeScreen />
        </main>
      </Container>
      <Footer />
    </>
  )
}

export default App
