const router = require('express').Router()
// If want auth
// const auth = require('../auth')

router.use('/puppeteer', require('./puppeteer'))

module.exports = router
