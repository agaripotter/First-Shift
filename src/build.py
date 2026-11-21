"""Build First Shift.

  python3 src/build.py            -> index.html  = REVIEW COPY (what the live link serves now)
                                     review.html = review copy (always)
                                     clean.html  = normal course without review tools (always)
                                     version.json (lets open pages detect a new version)
  python3 src/build.py --clean-live   -> index.html = normal course (switch the live link back)
"""
import os, sys, json, time
os.chdir(os.path.dirname(os.path.abspath(__file__)))

BUILD = time.strftime('%Y%m%d-%H%M%S', time.gmtime())
css = open('style.css').read()
content = ''.join(open(f).read() + '\n' for f in ['c1.js','c2.js','c3.js','c4.js','c5.js','c6.js','c7.js','c8.js','qpatch.js'])
eng = open('engine.js').read().replace("'__BUILD__'", repr(BUILD))
review = open('review.js').read()

def page(is_review):
    title = 'First Shift — ER Intern Induction Program · Corniche Medical City'
    if is_review:
        title = 'REVIEW COPY · ' + title
    flags = f"<script>window.REVIEW={'true' if is_review else 'false'};window.__BUILD={BUILD!r};</script>"
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F4F1EA">
<meta name="robots" content="noindex, nofollow">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="First Shift">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
<div id="app"></div>
<noscript>This program needs JavaScript. Open the file in Safari, Chrome or Edge.</noscript>
{flags}
<script>{content}</script>
<script>{eng}</script>
{'<script>' + review + '</script>' if is_review else ''}
</body>
</html>'''

review_live = '--clean-live' not in sys.argv
open('../index.html', 'w').write(page(review_live))
open('../clean.html', 'w').write(page(False))
open('../review.html', 'w').write(page(True))
json.dump({'build': BUILD, 'live': 'review' if review_live else 'clean'}, open('../version.json', 'w'))
print(f"build {BUILD} · index.html = {'REVIEW COPY' if review_live else 'clean course'} · {os.path.getsize('../index.html')//1024} KB")
