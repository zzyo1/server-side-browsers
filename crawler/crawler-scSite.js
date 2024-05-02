const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
//const SocksProxyAgent = require('socks-proxy-agent');

async function crawlSite(u, browser, resultsDir) {
    console.log("\n[url]=" + u);
    let page;
    let filePrefix = '0_'; // 기본 접두사
    let matchedWords = ''; // 매칭된 단어를 저장할 변수
  
    try {

      page = await browser.newPage();

      // set user-agent
      // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36');
      await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
      // Set the desired platform using JavaScript injection
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'platform', {
          get: () => 'Linux x86_64' // Change this to the desired platform
        });
      });
          
      //await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 360000 }); // 60 seconds timeout
      await page.goto(u, { waitUntil: 'networkidle0', timeout: 360000 }); // 60 seconds timeout
      

      filePrefix = '0_';
      
      // URL 파싱
      const parsedUrl = new URL(u);
      // console.log(parsedUrl);

      // 일반적인 site를 대상으로
      //const siteName = parsedUrl.hostname.replace(/[^a-zA-Z0-9]/g, '_'); 

      // // page2images.com대상
      // const siteName = (parsedUrl.searchParams.get('p2i_url') || parsedUrl.hostname).replace(/[^a-zA-Z0-9]/g, '_');

      // site-shot 대상: https://mini.site-shot.com/1000x1000/1000/png/?
      const siteName = (parsedUrl.search || parsedUrl.hostname).replace(/[^a-zA-Z0-9]/g, '_');

      // console.log(parsedUrl.searchParams.get('p2i_url'));
      // console.log(siteName);
            
      const screenshotPath = path.join(resultsDir, `${filePrefix}screenshot-${siteName}-${matchedWords}-${new Date().toISOString().replace(/:/g, '-')}.png`);
      // console.log(">>>" + screenshotPath);
      await page.screenshot({ path: screenshotPath });

    } catch (error) {
      console.error(`Error accessing ${u}: ${error}`);
    } finally {
      if (page) await page.close();
    }
  }
  
  async function crawlSites() {
    const resultsDir = path.join(__dirname, 'crawler_result/scan');
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

    // // 1. txt파일을 이용할때
    // //const browser = await puppeteer.launch();
    // let urls = (await fs.readFile(path.join(__dirname, 'scSite.conf'), 'utf8')).trim().split('\n');
    // urls = urls.map(u => u.trim());
  

    // 2. (port)url을 생성해서 이용할때
    // 기본 URL 설정
    // const baseUrl = 'http://127.0.0.1:1000';
    const baseUrl = 'http://localhost.127.0.0.1.nip.io:1000';
    // 시작 포트와 종료 포트
    const startPort = 7000;
    const endPort = 10000;
    // 포트 번호 배열 생성
    const portNumbers = Array.from({ length: endPort - startPort + 1 }, (_, i) => startPort + i);
    // 각 포트 번호에 대한 URL 생성
    const param_urls = portNumbers.map(port => {
        let currentUrl = new URL(baseUrl);
        currentUrl.port = port;
        return currentUrl.toString();
    });

    // 참고 https://www.google.com/url?sa=i&url=http://127.0.0.1:8080
    // 주어진 문자열을 각 URL 앞에 추가
    //const prefix = "https://api.page2images.com/freeimagetag?p2i_visual_link=2&p2i_url=";
    // const prefix = "https://mini.site-shot.com/1000x1000/1000/png/?";
    //const prefix = "https://mini.s-shot.ru/1024x768/JPEG/1024/Z100/?";    
    // const prefix = "https://pdfmyurl.com/api?license=6RJWXPdLLCBw&url=https://www.google.com/url?sa=i&url=";
    //const prefix = "https://api.browshot.com/api/v1/simple?key=z5TkGlkAYr84DNkEz2pya1khC9YES&size=screen&instance_id=12&cache=2592000&url=";
    const prefix = "http://api.pagepeeker.com/thumbs.php?size=l&code=090b7c517a&url=";
    
    const urls = param_urls.map(url => prefix + url);
    //const urls = param_urls.map(url => 'https://pdfmyurl.com/api?license=6RJWXPdLLCBw&url=https://www.google.com/url?sa=i&url=https://bing.com');  // 다른 url이 잘되는 지 확인하기 위해

    // // 3. (IP)url을 생성해서 이용할때
    // let param_urls = [];
    // for (let thirdOctet = 0; thirdOctet <= 255; thirdOctet++) {
    //   for (let fourthOctet = 1; fourthOctet <= 255; fourthOctet++) {
    //       // 첫 번째 옥텟과 두 번째 옥텟은 고정된 상태에서 세 번째와 네 번째 옥텟을 변경
    //       let ip = `http://192.168.${thirdOctet}.${fourthOctet}`;
    //       param_urls.push(ip);
    //   }
    // }
    // // 주어진 문자열을 각 URL 앞에 추가
    // //const prefix = "https://api.page2images.com/freeimagetag?p2i_visual_link=2&p2i_url=";
    // const prefix = "https://api.screenshotlayer.com/api/capture?access_key=1f7ff7cb16a5d912e9d483a04e87e363&viewport=1440x900&width=600&url=";
    // const urls = param_urls.map(url => prefix + url);



    // urls 변수에 저장된 URL들 출력 (선택적)
    console.log(urls);

    // 내 IP 캡쳐 - tor 적용여부 확인위해
    //crawlSite('https://www.findip.kr/', browser, resultsDir);
    crawlSite('https://ifconfig.me/', browser, resultsDir);
    
    
    
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
