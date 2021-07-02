const mongoose = require('mongoose')

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
      unique: true,
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

const People = mongoose.model('People', peopleSchema)
module.exports = People
