const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

async function crawlSite(u, browser, resultsDir) {
    console.log("\nurl=" + u);
    let page;
    let filePrefix = '0_'; // 기본 접두사
  
    try {
      page = await browser.newPage();
      await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 60000 }); // 60 seconds timeout
  
      const formExists = await page.evaluate(() => {
        const textInputs = [...document.querySelectorAll('input[type="text"]')];
        const regex = /screenshot|convert|capture|scan/i;
        const textExists = regex.test(document.body.innerText);
        return { textInputExists: textInputs.length > 0, textExists };
      });
  
      if (formExists.textInputExists) filePrefix = '1_';
      if (formExists.textExists) filePrefix = filePrefix === '1_' ? '2_' : '1_';
  
      if (filePrefix !== '0_') {
        console.log(`Matching site found: ${u}`);
        const siteName = new URL(u).hostname.replace(/[^a-zA-Z0-9]/g, '_'); 
        const screenshotPath = path.join(resultsDir, `${filePrefix}screenshot-${siteName}-${new Date().toISOString().replace(/:/g, '-')}.png`);
        await page.screenshot({ path: screenshotPath });
      }
    } catch (error) {
      console.error(`Error accessing ${u}: ${error}`);
    } finally {
      if (page) await page.close();
    }
  }
  
  async function crawlSites() {
    const resultsDir = path.join(__dirname, 'crawler_result');
    await fs.mkdir(resultsDir, { recursive: true }).catch(error => {
      if (error.code !== 'EEXIST') throw error;
    });
  
    const browser = await puppeteer.launch();
    let urls = (await fs.readFile(path.join(__dirname, 'targetSite.txt'), 'utf8')).trim().split('\n');
    urls = urls.map(u => 'https://' + u.trim());
  
    // Limit the number of concurrent crawls
    const maxConcurrentCrawls = 10; // Adjust this number based on your system capabilities
    for (let i = 0; i < urls.length; i += maxConcurrentCrawls) {
      const batch = urls.slice(i, i + maxConcurrentCrawls);
      await Promise.all(batch.map(u => crawlSite(u, browser, resultsDir)));
    }
  
    await browser.close();
    console.log('\nCrawling completed.');
  }
  
  crawlSites();