const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser

        try {
            const checkUser = await User.findOne({
                username: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                username,
                password: hash,
                confirmPassword: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin

        try {
            const checkUser = await User.findOne({
                email: email
            })

            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'sai tên đăng nhập'
                })
            }

            // const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (password !== checkUser.password) {
                resolve({
                    status: 'ERR',
                    message: 'The password or username is incorrect',
                })
            }

            // const access_token = await generalAccessToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })

            // const refresh_token = await generalRefreshToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: checkUser
                // access_token,
                // refresh_token
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS'
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const getAllUser = (limit = 20, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.countDocuments()
            const allUser = await User.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'GET ALL USER SUCCESS',
                data: allUser,
                total: totalUser
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}