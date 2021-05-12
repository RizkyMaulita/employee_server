const router = require('express').Router()
const { EmployeeController } = require('../controllers/index.js')

router.post('/register', EmployeeController.register)

module.exports = router