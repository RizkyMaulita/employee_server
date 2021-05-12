const router = require('express').Router()
const employeeRouter = require('./employeeRouter.js')
const productRouter = require('./productRouter.js')

router.get('/', (req, res) => res.send(`Server already connected !`))
router.use('/employees', employeeRouter)
router.use('/products', productRouter)

module.exports = router