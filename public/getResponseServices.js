const axios = require('axios');

// 사이트 URL 목록
const sites = [
'https://browshot.com/',
	'https://capturefullpage.com/',
	'https://domsignal.com/remote-screenshot',
	'https://grabz.it/',
	'http://www.page2images.com/',
	'https://pagepeeker.com/',
	'https://pikwy.com/',
	'https://www.screenshotmachine.com/',
	'https://screenshot.guru/',
	'https://screenshotlayer.com/',
	'https://screenshots.cloud/',
	'https://testlocal.ly/',
	'https://www.site-shot.com/',
	'https://www.url2png.com/',
	'https://webscreenshot.vercel.app/',
	'https://www.pdfcrowd.com/',
	'https://pdfmyurl.com/',
	'https://www.sejda.com/html-to-pdf',
	'https://www.html-to-pdf.net/',
	'https://webtopdf.com/',
	'https://tools.pdf24.org/'
];

// 각 사이트에 대해 HTTP 요청을 수행하고 응답 헤더를 콘솔에 출력하는 함수
async function fetchHeaders() {
  for (const site of sites) {
    try {
      const response = await axios.get(site);
      console.log(`Headers for ${site}:`);
      console.log(response.headers);
    } catch (error) {
      console.error(`Error fetching ${site}:`, error.message);
    }
  }
}

// 함수 실행
fetchHeaders();
