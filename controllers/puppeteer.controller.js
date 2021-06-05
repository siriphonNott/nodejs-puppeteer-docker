const Service = require('../services/puppeteer.service'),
  appConfig = require('../configs/app')
  // const { puppeteerService } = require('../services'),
const methods = {
  async welcome(req, res) {
    try {
      res.success({
        service: 'puppeteer',
        version: appConfig.apiVersion
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
