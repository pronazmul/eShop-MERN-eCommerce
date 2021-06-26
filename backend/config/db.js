const mongoose = require('mongoose')

const mongoConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected with ${connect.connection.name}`)
  } catch (error) {
    console.log(`Error ${error.message}`)
    process.exit(1)
  }
}

// MOdule Exports
module.exports = mongoConnection
