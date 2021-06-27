const colors = require('colors')
const Products = require('./data/Products')
const Users = require('./data/Users')

const Product = require('./models/productModel')
const User = require('./models/userModel')
const Order = require('./models/orderModel')
const mongoConnection = require('./config/db')

require('dotenv').config()

// Connection With Database
mongoConnection()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createUser = await User.insertMany(Users)
    const adminUser = createUser[0]._id

    const prepareProduct = Products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(prepareProduct)
    console.log('Data Inserted'.magenta.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data Destroyed'.magenta.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
