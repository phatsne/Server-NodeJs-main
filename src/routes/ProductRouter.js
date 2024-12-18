const express = require('express')
const router = express.Router()
const productController = require('../controller/ProductController')
const { authMiddleWare } = require('../middleware/authMiddleware')

router.post('/create', productController.createProduct)
router.put('/update/:id', authMiddleWare, productController.updateProduct)
router.get('/details/:id', productController.getDetailsProduct)
router.get('/all', productController.getProducts)
router.delete('/delete/:id', productController.deleteProduct)

module.exports = router