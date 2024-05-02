const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
//const SocksProxyAgent = require('socks-proxy-agent');

async function crawlSite(u, browser, resultsDir) {
    console.log("\nurl=" + u);
    let page;
    let filePrefix = '0_'; // 기본 접두사
    let matchedWords = ''; // 매칭된 단어를 저장할 변수
  
    try {

      page = await browser.newPage();
      await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 180000 }); // 60 seconds timeout
  
      const formExists = await page.evaluate(() => {
        const textInputs = [...document.querySelectorAll('input[type="text"]')];
        const regex = /screenshot|convert|capture/i;    //|scan
        let matchedText = '';
        if (regex.test(document.body.innerText)) {
          matchedText = document.body.innerText.match(regex)[0];
        }
        return { textInputExists: textInputs.length > 0, textExists: matchedText !== '', matchedText };
      });

      if (formExists.textInputExists) filePrefix = '1_';
      if (formExists.textExists) {
        filePrefix = filePrefix === '1_' ? '2_' : '1_';
        matchedWords = formExists.matchedText;
      }
  
      if (filePrefix !== '0_') {
        console.log(`Matching site found: ${u}`);
        const siteName = new URL(u).hostname.replace(/[^a-zA-Z0-9]/g, '_'); 
        const screenshotPath = path.join(resultsDir, `${filePrefix}screenshot-${siteName}-${matchedWords}-${new Date().toISOString().replace(/:/g, '-')}.png`);
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
  
    
    // Tor 프록시 설정
    //F:\tools\tor-expert-bundle-windows-x86_64-13.0.1\tor\tor.exe 실행시켜라
    const proxyUrl = 'socks5://127.0.0.1:9050';
    //const agent = new SocksProxyAgent(proxyUrl);

    // Puppeteer를 Tor 프록시와 함께 시작
    const browser = await puppeteer.launch({
        args: ['--proxy-server=' + proxyUrl]
    });
    
    //const browser = await puppeteer.launch();
    let urls = (await fs.readFile(path.join(__dirname, 'targetSite.txt'), 'utf8')).trim().split('\n');
    urls = urls.map(u => 'https://' + u.trim());
  
    // Limit the number of concurrent crawls
    const maxConcurrentCrawls = 10;
    for (let i = 0; i < urls.length; i += maxConcurrentCrawls) {
      const batch = urls.slice(i, i + maxConcurrentCrawls);
      await Promise.all(batch.map(u => crawlSite(u, browser, resultsDir)));
    }
  
    await browser.close();
    console.log('\nCrawling completed.');
  }
  
  crawlSites();
