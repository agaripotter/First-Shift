"""Review-copy feature test. Serves the repo over http so version.json works.
   python3 tests/review.py"""
import asyncio, json, os, subprocess, sys, time
from playwright.async_api import async_playwright
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
os.makedirs('shots', exist_ok=True)
PORT = 8765
URL = f'http://127.0.0.1:{PORT}/index.html'
CHROME = os.environ.get('CHROME')  # optional path to a Chrome binary

async def run(p, name, vp, touch):
    kw = {'executable_path': CHROME} if CHROME else {}
    b = await p.chromium.launch(args=['--no-sandbox'], **kw)
    ctx = await b.new_context(viewport=vp, has_touch=touch, accept_downloads=True)
    pg = await ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('dialog', lambda d: asyncio.ensure_future(d.accept('Test Reviewer')))
    await pg.goto(URL); await pg.wait_for_timeout(900)
    ok = {}
    ok['intro shown'] = await pg.is_visible('.rv-modal')
    await pg.fill('.rv-modal .rv-name input', 'Dr. Test')
    await pg.click('.rv-modal [data-x=go]'); await pg.wait_for_timeout(200)
    await pg.click('.mod[data-m=m01]'); await pg.wait_for_timeout(300)
    # screen 0 → highlight text in the mentor bubble
    await pg.evaluate("""()=>{const p=document.querySelector('#scr .bub p');const t=[...p.childNodes].find(n=>n.nodeType===3&&n.data.length>20);
      const r=document.createRange();r.setStart(t,0);r.setEnd(t,15);const s=getSelection();s.removeAllRanges();s.addRange(r);}""")
    await pg.wait_for_timeout(250)
    await pg.click('.rv-dock [data-rv-act=hl]'); await pg.wait_for_timeout(200)
    ok['highlight'] = await pg.evaluate("document.querySelectorAll('#scr mark.rv-hl').length>0")
    # general comment
    await pg.click('.rv-dock [data-rv-act=cm]'); await pg.fill('.rv-modal textarea', 'Add the Saudi name of the ER here.')
    await pg.click('.rv-modal [data-x=save]'); await pg.wait_for_timeout(200)
    # edit a paragraph inline
    await pg.click('.rv-dock [data-rv-act=edit]')
    await pg.click('#scr .nums .num span >> nth=0'); await pg.wait_for_timeout(150)
    await pg.keyboard.press('End'); await pg.keyboard.type(' (EDITED)')
    await pg.click('.rv-dock [data-rv-act=edit]'); await pg.wait_for_timeout(250)
    ok['inline edit'] = await pg.evaluate("!!document.querySelector('#scr .rv-edited') && document.querySelector('#scr .rv-edited').textContent.includes('(EDITED)')")
    # Continue unlocked on a screen with an unanswered activity (screen 2 has a sort)
    await pg.click('#nextb'); await pg.wait_for_timeout(200); await pg.click('#nextb'); await pg.wait_for_timeout(200)
    ok['continue unlocked'] = await pg.evaluate("!document.getElementById('nextb').disabled")
    # edit inside a button (sort chip) → modal editor
    await pg.click('.rv-dock [data-rv-act=edit]')
    await pg.click('#scr .srt-row .sx >> nth=0'); await pg.wait_for_timeout(150)
    if await pg.is_visible('.rv-modal textarea'):
        await pg.fill('.rv-modal textarea', 'Edited sort item text'); await pg.click('.rv-modal [data-x=save]')
    else:
        await pg.keyboard.press('End'); await pg.keyboard.type(' X'); await pg.click('.rv-dock [data-rv-act=edit]')
    if await pg.evaluate("document.body.classList.contains('rv-edit')"): await pg.click('.rv-dock [data-rv-act=edit]')
    await pg.wait_for_timeout(200)
    n_items = await pg.evaluate("JSON.parse(localStorage.getItem('firstshift.review.v1')).items.length")
    ok['4 notes saved'] = n_items == 4
    # notes list + go to
    await pg.click('.rv-dock [data-rv-act=list]'); await pg.wait_for_timeout(200)
    ok['notes list'] = await pg.evaluate("document.querySelectorAll('.rv-item').length") == 4
    await pg.screenshot(path=f'shots/rv_{name}_list.png')
    await pg.click('.rv-item [data-go] >> nth=0'); await pg.wait_for_timeout(500)
    ok['go to'] = await pg.evaluate("window.__fs.view().i===0")
    # reload: notes reapplied
    await pg.reload(); await pg.wait_for_timeout(700)
    await pg.click('.mod[data-m=m01]'); await pg.wait_for_timeout(400)
    if await pg.evaluate("window.__fs.view().i")!=0:
        await pg.evaluate("window.__fs.openMod('m01',0)"); await pg.wait_for_timeout(300)
    ok['persist highlight'] = await pg.evaluate("document.querySelectorAll('#scr mark.rv-hl').length>0")
    ok['persist edit'] = await pg.evaluate("!!document.querySelector('#scr .rv-edited')")
    await pg.screenshot(path=f'shots/rv_{name}_screen.png')
    # export
    if not touch:
        async with pg.expect_download() as dl:
            await pg.click('.rv-dock [data-rv-act=export]')
        d = await dl.value; path = await d.path(); data = json.load(open(path))
        ok['export json'] = data['count'] == 4 and data['reviewer'] == 'Dr. Test' and any(i['type']=='edit' and '(EDITED)' in i['after'] for i in data['items'])
        print(f"[{name}] export file: {d.suggested_filename}")
    # update banner
    vj = os.path.join(ROOT, 'version.json'); orig = open(vj).read()
    open(vj, 'w').write(json.dumps({'build': 'newer-test'}))
    await pg.evaluate("document.dispatchEvent(new Event('visibilitychange'))"); await pg.wait_for_timeout(800)
    ok['update banner'] = await pg.is_visible('#updbar')
    open(vj, 'w').write(orig)
    await pg.screenshot(path=f'shots/rv_{name}_update.png')
    await b.close()
    bad = [k for k, v in ok.items() if not v]
    print(f"[{name}] {'ALL PASS' if not bad else 'FAILED: ' + ', '.join(bad)}  {ok}  errors={errs}")
    return not bad and not errs

async def main():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        async with async_playwright() as p:
            r1 = await run(p, 'phone', {'width': 390, 'height': 844}, True)
            r2 = await run(p, 'laptop', {'width': 1440, 'height': 900}, False)
    finally:
        srv.terminate()
    sys.exit(0 if r1 and r2 else 1)
asyncio.run(main())
