import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'Admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Naim Chaabene',
    email: 'Naim@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Imen chermiti',
    email: 'Imen@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
