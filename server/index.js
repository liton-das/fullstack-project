const express = require('express')
const route = require('./src/routes')
const dbConnection = require('./src/config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://fullstack-project-green.vercel.app',
    credentials:true,
}))
app.use(route)


app.listen(PORT,(e)=>{
    dbConnection()
    if(e){
        console.log('Server not connected!',e)
    }
    console.log(`server connected on this PORT=>${PORT}`)
})