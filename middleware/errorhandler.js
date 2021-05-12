module.exports = (err, req, res, next) => {
  console.log(err, '<<< error')
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(error => ({ message: error.message }))
    res.status(400).json({ messages })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: `Email has been already exists !`})
  } else if (err.status && err.message) {
    res.status(err.status).json({ message: err.message })
  } else {
    res.status(500).json({ message: `Internal Server Error`})
  }
}