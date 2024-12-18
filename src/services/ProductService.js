const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const createdProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })
            if(createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdProduct
                }) 
            }
        }
        catch(e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The Product is not defined'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new : true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'DELETE PRODUCT SUCCESS'
            })
        }
        catch(e) {
            reject(e)
        }
    })
}


const getDetailsProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const getProducts = (limit, page, sort, filter) => {
    return new Promise( async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if (filter) {
                const productFilter = await Product.find({
                    [filter[0]]: {'$regex' : filter[1]}
                })
                resolve({
                    status: 'OK',
                    message: 'GET ALL PRODUCT SUCCESS',
                    data: productFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objSort = { }
                objSort[sort[1]] = sort[0]
                const productSort = await Product.find().limit(limit).skip(page * limit).sort(objSort)
                resolve({
                    status: 'OK',
                    message: 'GET ALL PRODUCT SUCCESS',
                    data: productSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const product = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'GET ALL PRODUCT SUCCESS',
                data: product,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        }
        catch(e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getProducts
}