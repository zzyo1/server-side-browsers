# Server-Side-Browsers(서버측 브라우저를 활용한 서비스)

- crawler/crawler.js: 상용 SSB 애플리케이션을 선정하기 위한 프로그램
  - 웹페이지를 이미지 또는 PDF로 변환해주는 웹사이트를 선별하는 크롤러
  - Node.js 기반
    
- Monitoring(Attacker) 서버
  - glitch에서 호스팅함
  - 상용 SSB 애플리케이션의 요청에 응답함
  - payload 전달 또는 redirection 응답
  - Node.js 기반
    
- xurlfind3r: 상용 SSB 애플리케이션과 관련된 URL 수집 프로그램
  - 인터넷에 노출되있는 서버측 요청을 유발하는 URL 수집
  - SSB 사이트에서 제공하는 API URL을 수집
  - Python 프로그램
    
- SSB_App: 웹페이지를 스크린캡쳐하는 SSB 애플리케이션
  - 스크린캡쳐하여 이미지를 제공하는 웹 애플리케이션
  - 헤드리스 브라우저로 puppeteer를 이용함
  - Node.js 기반
  - 구성
    - public/sitecapture.html: 웹페이지
    - index_screenshot.js: 백엔드
    - openSW/init_2param_Public.js: 스크린캡쳐 프로그램

[Example of SSRF Vulnerability]

![image](https://github.com/zzyo1/server-side-browser/assets/148316898/0b6f779d-2100-445e-8f8a-af44e90e76bd)


연구 환경
