import os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
css=open('style.css').read()
content=''.join(open(f).read()+'\n' for f in ['c1.js','c2.js','c3.js','c4.js','c5.js','c6.js','c7.js','c8.js','qpatch.js'])
eng=open('engine.js').read()
html=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F4F1EA">
<meta name="robots" content="noindex, nofollow">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="First Shift">
<title>First Shift — ER Intern Induction Program · Corniche Medical City</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
<div id="app"></div>
<noscript>This program needs JavaScript. Open the file in Safari, Chrome or Edge.</noscript>
<script>{content}</script>
<script>{eng}</script>
</body>
</html>'''
open('../index.html','w').write(html)
print(len(html)//1024,'KB')
