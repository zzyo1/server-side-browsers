const express = require('express');
const app = express();
const axios = require('axios');
const http = require('http');

const path = require('path');

const { exec } = require('child_process');

// 메인 웹 페이지 설정
app.use(express.static('public'));

/* jsonp를 사용하려면 아래와 같이 반환해주는 코드가 존재해야함
// 그렇지 않으면 open되지 않은 포트와 동일한 에러 발생, 구별어려움
// '/'로 응답하려면 '메인 웹 페이지 설정' 부분 주석처리 필요
app.get('/', (req, res) => {
    const callbackName = req.query.callback;
    const data = {
        someKey: "someValue",
        value: "1"
    };

    // mime 타입 반드시 지정
    res.setHeader('Content-Type', 'application/javascript');

    console.log(`${callbackName}(${JSON.stringify(data)})`);
    res.send(`${callbackName}(${JSON.stringify(data)})`);
});
*/


// 4000번 포트로 요청이 들어오면 실행될 라우터 핸들러
app.get('/screenshot', (req, res) => {
    const urlParam = req.query.url;
    if (urlParam) {
        // url 파라미터가 제공된 경우의 처리
        //res.send(`Received url parameter: ${urlParam}`);
    } else {
        // url 파라미터가 제공되지 않은 경우의 처리
        res.send('No url parameter provided.');
    }
    exec('node ../openSW/init_2param_Public.js '+ urlParam, { maxBuffer: 1024 * 10000 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.log(`stdout: ${stdout}`);
            //console.error(`stderr: ${stderr}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
        const lines = stdout.trim().split('\n');  // 줄바꿈으로 분할
        const lastLine = lines[lines.length - 1]; // 마지막 줄 선택

        const absolutePath = lastLine;
        const filename = path.basename(absolutePath);

        console.log(req.protocol + "://" + req.headers.host+"/"+filename);  // 출력: myfile.txt

        res.send( req.protocol + "://" + req.headers.host+"/"+filename);  // 마지막 줄로 응답 - 생성 이미지 경로
    });
});


var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is working : PORT - ', port);
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