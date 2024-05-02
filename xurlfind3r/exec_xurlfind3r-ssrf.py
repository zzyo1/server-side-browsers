import subprocess

# xurlfind3r 도구를 이용하여 tanco 10만 사이트내 모든 url을 수집함
# 이후, url내 파라미터로 아래 단어 포함된 url만 추출
# [ url, action, addr, address, domain, from , host, href, http_host, load, page, preview
# proxy, ref, referer, referrer, rref, site, src, target, url, uri, web ]


# 실행할 명령어
command = "F:/GGG/go/bin/xurlfind3r.exe"

# 웹 사이트 목록
websites = [
# 'https://browshot.com/'
# ,'https://capturefullpage.com/'
# ,'https://domsignal.com/remote-screenshot'
# ,'https://grabz.it/'
# ,'http://www.page2images.com/'
# ,'https://pagepeeker.com/'
# ,'https://pikwy.com/'
# ,'https://www.screenshotmachine.com/'
# ,'https://screenshot.guru/'
# ,'https://screenshotlayer.com/'
# ,'https://screenshots.cloud/'
# ,'https://testlocal.ly/'
# ,'https://www.site-shot.com/'
# ,'https://www.url2png.com/'
# ,'https://webscreenshot.vercel.app/'
# ,'https://www.pdfcrowd.com/'
# ,'https://pdfmyurl.com/'
# ,'https://www.sejda.com/html-to-pdf'
# ,'https://www.html-to-pdf.net/'
# ,'https://webtopdf.com/'
# ,'https://tools.pdf24.org/en/webpage-to-pdf'
# ,'https://wave.webaim.org/'
# ,'https://urlscan.io/'
# ,'https://html2pdf.com/'
# ,'https://wkhtmltopdf.org/'
# ,'https://archive.ph'

# ,'https://www.s-shot.ru/'
# ,'https://thumbnail.ws/make.html'

# 'https://fullpagescreencapture.com'
# ,'https://ettvi.com/website-screenshot-generator'
# ,'https://www.freeconvert.com'

# 'https://vivoldi.com'
# ,'https://onlineconvertfree.com'

# 'https://rakko.tools/tools/125/'

# 'https://dataflowkit.com'
# ,'https://tools.simpletools.nl'

# 'https://www.htmlapdf.com/'

# 'https://cloudconvert.com/website-png-screenshot'
# ,'https://cloudconvert.com'

#'https://web.archive.org'
#'https://www.operadeparis.fr/'

    # 다른 웹 사이트를 추가할 수 있습니다.
    
    'https://cdkm.com/html-to-txt'
    ,'https://convertio.co/kr/html-txt/'
    
]

# 각 웹 사이트에 대한 명령어 실행
for website in websites:
    # 명령어와 인수를 리스트로 정의
    args = [
        command,
        '-d', website,
        '--include-subdomains',
        '-o', f"F:/GGG/go/xurlfind3r_output_ssrf/{website.replace('https://', '').replace('http://', '')}.txt"
    ]


    ## https://pdfmyurl.com/?url=http://www.testmagazine.de/testmagberichte/samsung_babyphone_wireless_colour_video_monitor_sew_3035_im_praxistest201204.html
    


    # 명령어 실행
    process = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

    # 명령어 실행 결과 처리
    stdout, stderr = process.communicate()
    if process.returncode == 0:
        print(f"Command output for {website}: {stdout.decode()}")
    else:
        print(f"Command error for {website}: {stderr.decode()}")

    print(f"Command for {website} exited with code {process.returncode}")
