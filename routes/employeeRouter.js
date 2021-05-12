const router = require('express').Router()
const { EmployeeController } = require('../controllers/index.js')

router.post('/register', EmployeeController.register)
router.post('/login', EmployeeController.login)

module.exports = router