const Service = require('../services/puppeteer.service')

const methods = {
  async welcome(req, res) {
    let result = await Service.welcome(req.params.lang || 'th')
    res.success(result)
    try {
      res.success({
        service: 'puppeteer',
        version: result
      })
    } catch (error) {
      res.error(error)
    }
  },
  async onGetTop10CryptocurrencyPrices(req, res) {
    try {
      let result = await Service.getTop10CryptocurrencyPrices(req.params.lang || 'th')
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
}

module.exports = { ...methods }
