 const { puppeteerHelper } = require('../helpers'),
  { ErrorInternalServer } = require('../configs/errorMethods')

const methods = {
  async getContents(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await puppeteerHelper.getContent({
          linkUrl: 'https://nodejs.org/en/',
          mainSelector: '.container',
          containerSelector: '#home-intro .home-downloadblock',
          callback: (list) => {
            return  list.map(ele => ({
              LTSVersion: ele.querySelector('a').innerText,
              CurrVersion: ele.querySelector('a').innerText,
             }))
          }
        })
        resolve(result)
      } catch (error) {
        reject(ErrorInternalServer(error.message))
      }
    })
  },
}

module.exports = { ...methods }
