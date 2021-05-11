const router = require('express').Router()

router.get('/', (req, res) => res.send(`Server already connected !`))

module.exports = router