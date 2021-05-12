const router = require('express').Router()
const employeeRouter = require('./employeeRouter.js')

router.get('/', (req, res) => res.send(`Server already connected !`))
router.use('/employees', employeeRouter)

module.exports = router