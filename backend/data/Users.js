const bcrypt = require('bcrypt')

const Users = [
  {
    name: 'Nazmul Huda',
    email: 'nazmul@gmail.com',
    password: bcrypt.hashSync('Nazmul@01', 10),
    role: 'admin',
  },
  {
    name: 'Billal Hossain',
    email: 'billal@gmail.com',
    password: bcrypt.hashSync('Billal@01', 10),
  },
]

module.exports = Users
