//External Modules:
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// Internal Modules:
const {
  notFoundHandler,
  errorHandler,
} = require('./middleware/common/errorHandler')
const productRouter = require('./router/productRouter')

// Configuration
const app = express()
dotenv.config()

// Database Connection:
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully Connected to Database '))
  .catch((err) => console.log(err))

// Request Parser
app.use(express.json())

// Cookie Signed-Cookie Parser:
app.use(cookieParser(process.env.COOKIE_SECRET))

// Application Routing:
app.use('/api/products', productRouter)

// Not Found Handler:
app.use(notFoundHandler)

// Error Handler:
app.use(errorHandler)

// Server Listener:
app.listen(process.env.PORT, () =>
  console.log(`Server Running Port ${process.env.PORT} `)
)
