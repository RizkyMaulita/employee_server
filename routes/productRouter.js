const router = require('express').Router()
const { ProductController } = require('../controllers')
const { employeeAuthentications } = require('../middleware/authentications.js')

router.get('/', ProductController.fetchProducts)

router.use(employeeAuthentications)
router.post('/:product_id/create', ProductController.createSalesHistory)
router.get('/history', ProductController.fetchSalesHistory)

module.exports = router