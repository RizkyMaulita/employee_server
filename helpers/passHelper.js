const bcrypt = require('bcryptjs')

const generatePassword = (plainPass) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(plainPass, salt)
  return hash
}

const verifyPassword = (plainPass, hashPass) => {
  return bcrypt.compareSync(plainPass, hashPass)
}

module.exports = {
  generatePassword,
  verifyPassword
}