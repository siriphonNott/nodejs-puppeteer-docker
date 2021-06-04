const router = require('express').Router()
const controllers = require('../../controllers/puppeteer.controller')

router.get('/', controllers.welcome)
router.get('/get-contents', controllers.onGetContents)

module.exports = router
