
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded( {extended: false}))
app.use(bodyParser.json())

const User = mongoose.model('User', {
    first_name: String,
    last_name: String,
    email: String,
    avatar: String
})

app.get('/', (req, res) => {
    res.json({
        status: 'SUCCESS',
        message: 'Server Connected Successfully'
    })
})

app.get('/users', async(req,res) => {
    try{
        const user = await User.find({})
        res.json({
            status: 'SUCCESS',
            data:user
        })
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something Went Wrong'
        })
    }
})

app.post('/users', async(req,res) => {
    try{ 
        console.log('Yes', req.body)
        const {first_name, last_name, email, avatar} = req.body
        await User.create({first_name, last_name, email, avatar})
        const user = await User.find({})
        res.json({
            status: 'SUCCESS',
            message: 'User created Successfully'
        })
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something Went Wrong'
        })
    }
})
app.listen(process.env.PORT, () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Server is running on http://localhost:${process.env.PORT}'))
    .catch(error => console.log(error))
    
})