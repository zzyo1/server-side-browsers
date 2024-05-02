/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

process.env.DEBUG = "puppeteer:*";

//import puppeteer from 'puppeteer';  //ES6, mjs확장자 사용시
const puppeteer = require('puppeteer');
const path = require('path');

// user param
const args = process.argv.slice(2);
console.log(args);  // ['arg1', 'arg2', 'arg3']
let url = args[0];
console.log(`url=${url}`);
if (url == null ) url='http://google.com'; // 'file://F://GGG//openSW//init_1.js'

(async () => {
  const browser = await puppeteer.launch({ 
    ignoreDefaultArgs: true,
    args: [
      '--disable-web-security',
      '--user-data-dir=~/chromeTemp2', // 이걸 지정해줘야 설정이 먹힘
      '--disable-gpu',
      '--enable-usermedia-screen-capturing',
      '--allow-http-screen-capture',
      '--start-fullscreen',
      '--kiosk',
      '--disable-infobars',
      '--ignore-certificate-errors', 
      '--unsafe-perm',
      '--allow-file-access-from-files'
     ]
     //,ignoreHTTPSErrors: true
     ,headless: false  // 실제 동작하는 모습을 보고싶을때
    });
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // change user-agent(현재 노트북 chrome버전으로, 231129)- 변경안하면->[HeadlessChrome/118.0.5993.70 Safari/537.36]
  //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setUserAgent('Mozilla/5.0 (WindowsNT10.0; Win64; x64; rv: 56.0) Gecko/20100101 Firefox/56.0');
  //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/56.0');

  // Set the desired platform using JavaScript injection
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'platform', {
      get: () => 'Linux x86_63' // Change this to the desired platform
    });

    Object.defineProperty(navigator, 'hardwareConcurrency', {
      get: () => 99 // Change this to the desired cpu
    });

    Object.defineProperty(navigator, 'deviceMemory', {
      get: () => 55 // Change this to the desired memeody
    });

  });

  // // 한번에 설정을 변경하고 할때 사용
  // await page.emulate({
  //   viewport: { width: 800, height: 600 },
  //   userAgent: 'Mozilla/5.0 (WindowsNT10.0; Win64; x64; rv: 56.0) Gecko/20100101 Firefox/56.0',
  //   platform: 'Linux x86_64',   // <-- 변경되지 않는다.
  // });


  await page.setViewport({ width:1280, height: 2048, deviceScaleFacotr: 1});

  //await page.goto('http://google.com');
  //await page.goto('file://F://GGG//openSW//init_1.js');
  //await page.goto( url );   //  기본세팅임, Puppeteer가 리다이렉트에 대해 안전하지 않다고 판단할 때 발생, (file:// 프로토콜에 대해서 위험하다고 판단하는 듯, google은 잘됨)
  await page.goto( url , { waitUntil: 'networkidle0', timeout: 60000 });  // waitUntil 옵션에서 networkidle0 값을 많이 사용하는 이유는 웹 페이지의 모든 리소스가 로드된 후 추가적인 네트워크 활동이 없을 때까지 기다리기를 원하는 경우가 많기 때문
  
  // desktop
  //const output_filename = "F://GGG//nodeJS//public//" + path.basename(url) + ".png";
  // notebook-win11
  const output_filename = "C://GGG//nodejs_ws//nodeJS//public//" + path.basename(url) + ".png";
  await page.screenshot({
            path: output_filename
            //,fullpage: true
          });

     
  await browser.close();

  console.log(output_filename);   // 문자열 반환효과
})();

// F:\GGG\openSW>node init_2param_Public.js.js  http://google.com

