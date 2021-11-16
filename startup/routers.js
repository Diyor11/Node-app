const express = require('express')
const errorMid = require('../middleware/errorMid')
const user = require('../routes/user')

module.exports = (app) => {
    app.use(express.json())
    app.use('/api/test', user)
    app.use(errorMid)
}