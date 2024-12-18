const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        
        const user = await ProductService.createProduct(req.body)
        return res.status(200).json(user)
    }
    catch(e) {
        return res.status(404).json({message: e})
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const product = await ProductService.updateProduct(productId, data)
        return res.status(200).json(product)
    }
    catch(e) {
        return res.status(404).json({message: e})
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const product = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(product)
    }
    catch(e) {
        return res.status(404).json({message: e})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const product = await ProductService.deleteProduct(productId)
        return res.status(200).json(product)
    }
    catch(e) {
        return res.status(404).json({message: e})
    }
}

const getProducts = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const product = await ProductService.getProducts(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(product)
    }
    catch(e) {
        return res.status(404).json({message: e})
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getProducts
}