const authApi = require('./api/auth')
const blogApi = require('./api/blogs')

const route = require('express').Router()
// Auth Api
route.use('/auth',authApi)
// Blog Api
route.use('/blog',blogApi)

module.exports = route