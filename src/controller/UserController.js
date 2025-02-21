const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body
        const reg = /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/
        const isCheckusername = reg.test(username)
        if (!username || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        else
            if (!isCheckusername) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is username'
                })
            }
            else if (password !== confirmPassword) {

                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is equal confirmPassword'
                })
            }
        const user = await UserService.createUser(req.body)
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^[a-z0-9](\.?[a-z0-9]){7,}@gmail\.com$/
        // console.log('username-password', email, password)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const user = await UserService.loginUser(req.body)
        const { refresh_token, ...newUser } = user
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            Secure: true
        })

        return res.status(200).json(newUser)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const user = await UserService.updateUser(userId, data)
        console.log('data', data)
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const user = await UserService.deleteUser(userId)
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await UserService.getAllUser()
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const user = await UserService.getDetailsUser(userId)
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]

        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const user = await JwtService.refreshTokenJwt(token)
        return res.status(200).json(user)
    }
    catch (e) {
        return res.status(404).json({ message: e })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}