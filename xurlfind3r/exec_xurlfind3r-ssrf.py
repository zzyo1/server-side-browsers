import subprocess

# xurlfind3r 도구를 이용하여 tanco 10만 사이트내 모든 url을 수집함
# 이후, url내 파라미터로 아래 단어 포함된 url만 추출
# [ url, action, addr, address, domain, from , host, href, http_host, load, page, preview
# proxy, ref, referer, referrer, rref, site, src, target, url, uri, web ]


# 실행할 명령어
command = "F:/GGG/go/bin/xurlfind3r.exe"

# 웹 사이트 목록
websites = [
    'https://www.site-shot.com/'
    ,'https://pdfmyurl.com/'
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
