/*
  Project: Puppeteer helper is library which provides function to control DOM
  Author: NottDev
  Created Date: 03/06/21 23:23
*/
const puppeteer = require('puppeteer');
module.exports = {
  async getContent({
    linkUrl = '',
    mainSelector = '',
    containerSelector = '',
    callback = Function,
    timeout = 30000,
  } = {}) {
    try {
      const browser = await puppeteer.launch()
      // const browser = await puppeteer.launch({
      //   args: [
      //     '--no-sandbox',
      //     '--disable-setuid-sandbox'
      //   ]
      // });
      const page = await browser.newPage();
       // Configure the navigation timeout
      await page.setDefaultNavigationTimeout(0);
      await page.goto(linkUrl, {
        waitUntil: 'networkidle0',
      });

      await page.waitForSelector(mainSelector.trim(), { timeout });
      const contentList = await page.$$eval(containerSelector.trim(), callback)
      await browser.close();
      return contentList;
    } catch (error) {
      console.log('[puppeteer error]: ', error);
      return error
    }
  }
}
