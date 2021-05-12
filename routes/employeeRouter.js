const router = require('express').Router()
const { EmployeeController } = require('../controllers/index.js')
const { employeeAuthentications } = require('../middleware/authentications.js')

router.post('/register', EmployeeController.register)
router.post('/login', EmployeeController.login)

router.use(employeeAuthentications)
router.get('/profile', EmployeeController.getProfile)
router.put('/profile', EmployeeController.updateProfile)

module.exports = router