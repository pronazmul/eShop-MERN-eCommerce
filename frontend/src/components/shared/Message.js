import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info', error }) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{error}</Alert.Heading>
    </Alert>
  )
}

export default Message
