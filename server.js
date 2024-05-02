// npm install body-parser
// server
const express = require('express');
const app = express();
const path = require('path');

// 사용자 정의 미들웨어
app.use((req, res, next) => {
  // HTML 파일에 대한 요청이면 헤더를 출력
  if (path.extname(req.path).toLowerCase() === '.html') {
    console.log('\n---');  
    console.log('[' + req.path + ']Requested HTML file:', req.path);
    console.log('[' + req.path + ']Headers:', req.headers);
  }
  next(); // 다음 미들웨어로 이동
});

// Serve static files from 'public' directory
app.use(express.static('public'));

app.get('/confirmRequest', (req, res) => {
    console.log('\n---');    
    console.log('[confirmRequest]Received headers:', req.headers);
    res.end();                  // 응답 종료
});

// JSON 형태의 본문을 파싱하기 위한 설정
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// /receive 경로로 POST 요청을 받을 때의 처리
app.post('/receive', (req, res) => {
    console.log('\n---');  
    console.log('[MSG_receive]Requested HTML file:', req.path);
    console.log('[MSG_receive]Headers:', req.headers);
    console.log('[MSG_receive]Received data: ', req.body);

    // 응답 전송
    res.status(200).send('Data received successfully');
});

// https://artistic-spiny-network.glitch.me/redirect?u=https://google.com
app.get('/redirect', (req, res) => {
    console.log('\n---');  
    console.log('[/redirect]Received headers:', req.headers);
  
    // 'u' 쿼리 파라미터 추출
    const url = req.query.u;

    // 유효한 URL이 제공되었는지 확인
    if (url) {
        // 클라이언트를 제공된 URL로 리디렉트
        res.redirect(url);
    } else {
        // 유효한 URL이 제공되지 않았을 경우 에러 메시지 전송
        res.status(400).send('Bad Request: Missing or incorrect URL parameter');
    }
});

app.get('/aas', (req, res) => {
    console.log('\n---');  
    console.log('[/aas]Received headers:', req.headers);

    res.status(302);             // HTTP 상태 코드를 302로 설정
  
    // 'Location' 헤더에 리다이렉트 대상 URL 설정
    res.setHeader('Location', 'http://google.com');   
  
    res.end();                  // 응답 종료

});

// F:file
// a: apache
// 1:127.0.01
// b: basic
// l: localtest.me
// cr: client redirect
// sr: server redirect
// A: admin page
// P: phpmyadmin page

app.get('/basic', (req, res) => {
    var url = 'http://127.0.0.1';
    console.log('\n---');
    console.log('[basic]Requested HTML file:', req.path);
    console.log('[basic]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);

    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/apache_127', (req, res) => {
    var url = 'http://127.0.0.1/server-status';
    //var url = 'http://localhost/server-status';
    console.log('\n---');
    console.log('[apache_127]Requested HTML file:', req.path);
    console.log('[apache_127]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/apache_localtest', (req, res) => {
    var url = 'http://localtest.me/server-status';
    console.log('\n---');  
    console.log('[apache_localtest]Requested HTML file:', req.path);
    console.log('[apache_localtest]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/nginx_127', (req, res) => {
    var url = 'http://127.0.0.1/nginx_status';
    console.log('\n---');  
    console.log('[nginx_127]Requested HTML file:', req.path);
    console.log('[nginx_127]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/nginx_localtest', (req, res) => {
    var url = 'http://localtest.me/nginx_status';
    console.log('\n---');  
    console.log('[nginx_localtest]Requested HTML file:', req.path);
    console.log('[nginx_localtest]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/basic_admin', (req, res) => {
    var url = 'http://127.0.0.1/admin';
    console.log('\n---');  
    console.log('[basic_admin]Requested HTML file:', req.path);
    console.log('[basic_admin]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/basic_phpmyadmin', (req, res) => {
    var url = 'http://127.0.0.1/phpmyadmin';
    console.log('\n---');
    console.log('[basic_phpmyadmin]Requested HTML file:', req.path);
    console.log('[basic_phpmyadmin]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});


app.get('/yahoo', (req, res) => {
    var url = 'https://yahoo.com';
    console.log('\n---');
    console.log('[yahoo]Requested HTML file:', req.path);
    console.log('[yahoo]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});

app.get('/bing', (req, res) => {
    var url = 'https://bing.com';
    console.log('\n---');
    console.log('[bing]Requested HTML file:', req.path);
    console.log('[bing]Received headers:', req.headers);
    console.log('[' + req.path + ']Redirect!!-' + url);
    res.status(302);             // HTTP 상태 코드를 302로 설정
    
    res.setHeader('Location', url); 
    res.end();                  // 응답 종료
});
        
var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('A Server is working : PORT - ', port);
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
