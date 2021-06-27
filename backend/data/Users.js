const bcrypt = require('bcrypt')

const Users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'Billal',
    email: 'billal@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
]

module.exports = Users
