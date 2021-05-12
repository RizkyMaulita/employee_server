const router = require('express').Router()
const { ProductController } = require('../controllers')

router.get('/', ProductController.fetchProducts)

module.exports = router