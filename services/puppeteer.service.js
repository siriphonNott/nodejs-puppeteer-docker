 const { puppeteerHelper } = require('../helpers'),
  { ErrorNotFound, ErrorInternalServer } = require('../configs/errorMethods')

const methods = {

  welcome() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await puppeteerHelper.getContent({
            linkUrl: 'https://www.npmjs.com/package/puppeteer',
            containerSelector: '#main',
            itemSelectorAll: '#top > div',
            callback: (list) => {
              return list.slice(2).map(ele => {
                return {
                  name: 'Puppeteer',
                  linkUrl: 'https://www.npmjs.com/package/puppeteer',
                  command: (ele.querySelector('span') || {}).innerText,
                  weeklyDownloads: (ele.querySelector('div:nth-child(3) p') || {}).innerText,
                  version: (ele.querySelector('div:nth-child(4) > p') || {}).innerText,
                  license: (ele.querySelector('div:nth-child(5) > p') || {}).innerText,
                  unpackedSize: (ele.querySelector('div:nth-child(6) > p') || {}).innerText,
                  totalFiles: (ele.querySelector('div:nth-child(7) > p') || {}).innerText,
                  issues: (ele.querySelector('div:nth-child(8) > p') || {}).innerText,
                  pullRequests: (ele.querySelector('div:nth-child(9) > p') || {}).innerText,
                  homepage: (ele.querySelector('div:nth-child(10) > p') || {}).innerText,
                  repository: (ele.querySelector('div:nth-child(11) > p') || {}).innerText,
                  LastPublish: (ele.querySelector('div:nth-child(12) > p') || {}).innerText,
                }
              })
            }
          })
          resolve(Array.isArray(result) && result.length > 0 ? result[0] : [])
        } catch (error) {
          reject(ErrorInternalServer(error.message))
        }
      })()
    })
  },
  getTop10CryptocurrencyPrices(lang) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await puppeteerHelper.getContent({
            linkUrl: `https://coinmarketcap.com/${lang}/`,
            containerSelector: '.cmc-homepage',
            itemSelectorAll: 'table.cmc-table > tbody > tr',
            callback: (list) => {
              return  list.slice(0, 10).map(ele => {
                const price24HSign = ele.querySelector('td:nth-child(5) span span.icon-Caret-down') ? '-' : ''
                const price7DSign = ele.querySelector('td:nth-child(6) span span.icon-Caret-down') ? '-' : ''
                return {
                  coinLogoUrl: (ele.querySelector('td:nth-child(3) img.coin-logo') || {}).src,
                  coinName: (ele.querySelector('td:nth-child(3) div > a > div > div > a') || {}).innerText,
                  coinSymbol: (ele.querySelector('td:nth-child(3) p.coin-item-symbol') || {}).innerText,
                  coinPrice: (ele.querySelector('td:nth-child(4) a.cmc-link') || {}).innerText,
                  price24H: (price24HSign + ele.querySelector('td:nth-child(5) span') || {}).innerText,
                  price7D: (price7DSign +  ele.querySelector('td:nth-child(6) span') || {}).innerText,
                  marketCap: (ele.querySelector('td:nth-child(7) p > span:nth-child(2)') || {}).innerText,
                  volume24H: (ele.querySelector('td:nth-child(8) div > a > p') || {}).innerText,
                  circulatingSupply: (ele.querySelector('td:nth-child(9) div > div > p') || {}).innerText,
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
              items: result
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
