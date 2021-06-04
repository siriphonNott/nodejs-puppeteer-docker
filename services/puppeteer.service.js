 const { puppeteerHelper } = require('../helpers'),
  { ErrorInternalServer } = require('../configs/errorMethods')

const methods = {
  async getContents(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await puppeteerHelper.getContent({
          linkUrl: 'https://nottdev.com/',
          mainSelector: '.resume-section',
          containerSelector: '.resume-item',
          callback: (list) => {
            return  list.map(ele => ({
              position: ele.querySelector('h3').innerText,
              company: ele.querySelector('.subheading').innerText,
              periodDate: ele.querySelector('.resume-date span').innerText,
              detail: Object.values(ele.querySelectorAll('ul li')).map(v => v.innerText)
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
