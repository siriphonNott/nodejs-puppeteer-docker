const router = require('express').Router()
const controllers = require('../../controllers/puppeteer.controller')

router.get('/', controllers.welcome)
router.get('/get-top10-cryptocurrency-prices/:lang', controllers.onGetTop10CryptocurrencyPrices)

module.exports = router
