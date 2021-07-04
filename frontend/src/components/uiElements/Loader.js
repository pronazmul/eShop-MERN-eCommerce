import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <Spinner
        animation='grow'
        variant='primary'
        style={{ height: '100px', width: '100px' }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
