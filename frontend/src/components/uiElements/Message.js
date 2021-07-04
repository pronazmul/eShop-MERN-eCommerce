import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{children}</Alert.Heading>
    </Alert>
  )
}

export default Message
