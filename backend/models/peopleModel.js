const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    mobile: String,
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

peopleSchema.methods.matchedPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const People = mongoose.model('People', peopleSchema)
module.exports = People
