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
  origin: [
    "http://localhost:5173",
    "https://fullstack-project-green.vercel.app"
  ],
  credentials: true
}));
app.use(route)
dbConnection()


app.listen(PORT,(e)=>{
    if(e){
        console.log('Server not connected!',e)
    }
    console.log(`server connected on this PORT=>${PORT}`)
})