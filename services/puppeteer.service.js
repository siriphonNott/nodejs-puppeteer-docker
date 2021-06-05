 const { puppeteerHelper } = require('../helpers'),
  { ErrorNotFound, ErrorInternalServer } = require('../configs/errorMethods')

const methods = {
  getTop10CryptocurrencyPrices(lang) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await puppeteerHelper.getContent({
            linkUrl: `https://coinmarketcap.com/${lang}/`,
            containerSelector: '.cmc-homepage',
            itemSelectorAll: 'table.cmc-table > tbody > tr',
            callback: (list) => {
              return  list.map(ele => {
                const price24HSign = ele.querySelector('td:nth-child(5) span span.icon-Caret-down') ? '-' : ''
                const price7DSign = ele.querySelector('td:nth-child(6) span span.icon-Caret-down') ? '-' : ''
                return {
                  coinLogoUrl: ele.querySelector('td:nth-child(3) img.coin-logo')?.src,
                  coinName: ele.querySelector('td:nth-child(3) div > a > div > div > a')?.innerText,
                  coinSymbol: ele.querySelector('td:nth-child(3) p.coin-item-symbol')?.innerText,
                  coinPrice: ele.querySelector('td:nth-child(4) a.cmc-link')?.innerText,
                  price24H: price24HSign + ele.querySelector('td:nth-child(5) span')?.innerText,
                  price7D: price7DSign +  ele.querySelector('td:nth-child(6) span')?.innerText,
                  marketCap: ele.querySelector('td:nth-child(7) p > span:nth-child(2)')?.innerText,
                  volume24H: ele.querySelector('td:nth-child(8) div > a > p')?.innerText,
                  circulatingSupply: ele.querySelector('td:nth-child(9) div > div > p')?.innerText,
                }
              })
            }
          })
          if (!Array.isArray(result)) {
            reject(ErrorNotFound(`${lang}: not found`))
          } else {
            resolve({
              name: 'Top 10 Cryptocurrencies',
              referenceFrom: 'https://coinmarketcap.com/',
              language: lang,
              items: Array.isArray(result) ? result.slice(0, 10) : []
            })
          }
        } catch (error) {
          reject(ErrorInternalServer(error.message))
        }
      })()
    })
  },
}

module.exports = { ...methods }
