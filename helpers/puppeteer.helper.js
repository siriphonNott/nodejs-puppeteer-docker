/*
  Project: Puppeteer helper is library which provides function to control DOM
  Author: NottDev
  Created Date: 03/06/21 23:23
*/
const puppeteer = require("puppeteer");
module.exports = {
  async getContent({
    linkUrl = "",
    containerSelector = "",
    itemSelectorAll = "",
    callback = Function,
    timeout = 10000,
  } = {}) {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      // Configure the navigation timeout
      await page.setDefaultNavigationTimeout(timeout);
      await page.goto(linkUrl, {
        waitUntil: "networkidle0",
      });

      await page.waitForSelector(containerSelector.trim(), { timeout });
      const contentList = await page.$$eval(itemSelectorAll.trim(), callback);
      await browser.close();
      return contentList;
    } catch (error) {
      console.log("[puppeteer error]: ", error);
      return error;
    }
  },
};
