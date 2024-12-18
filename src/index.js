const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()
const User = require('./models/UserModel')

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        // const allUser = Account.findOne({ email: "mtam2003it@gmail.com", password: "Dev@06042003" })
        // console.log(allUser)
        console.log('Connect to database success!')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());

routes(app)


app.listen(port, () => {
    console.log('server is running in PORT', + port)
})

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm người dùng:", error);
        throw error;
    }
} // Ví dụ cách sử dụng hàm tìm kiếm người dùng
(async () => {
    try {
        const userEmail = "mtam2003it@gmail.com";
        const user = await findUserByEmail(userEmail);
        if (user) {
            console.log("Người dùng tìm thấy:", user);
        } else {
            console.log("Không tìm thấy người dùng với email:", userEmail);
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
})();
