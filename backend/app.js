//External Modules:
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const path = require('path')

// Internal Modules:
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const mongoConnection = require('./config/db')

// Configuration
const app = express()
dotenv.config()

// MongoDB Connection:
mongoConnection()

// Make Static Public Accessible Folder
app.use(express.static(path.join(__dirname, 'public')))

// Request Parser
app.use(express.json())

// Cookie Signed-Cookie Parser:
app.use(cookieParser(process.env.COOKIE_SECRET))

// Application Routing:
app.use('/api/products', productRouter)
app.use('/api/user', userRouter)

// Not Found Handler:
app.use(notFoundHandler)

// Error Handler:
app.use(errorHandler)

// Server Listener:
app.listen(process.env.PORT, () =>
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode in port: ${process.env.PORT} `
      .rainbow.bold
  )
)
