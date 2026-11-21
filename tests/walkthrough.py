import os
os.makedirs('shots',exist_ok=True)
import asyncio, sys
from playwright.async_api import async_playwright
F='file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','index.html'))
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--no-sandbox'], **({'executable_path':os.environ['CHROME']} if os.environ.get('CHROME') else {}))
    pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
    await pg.add_init_script("try{if(!localStorage.getItem('firstshift.review.v1'))localStorage.setItem('firstshift.review.v1',JSON.stringify({name:'',items:[],intro:true}))}catch(e){}")
    errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.on('console',lambda m:errs.append('console:'+m.text) if m.type=='error' else None)
    await pg.goto(F); await pg.wait_for_timeout(1500)
    await pg.screenshot(path='shots/01_home.png')
    await pg.screenshot(path='shots/02_home_full.png',full_page=True)
    # Walk every module, answering everything automatically
    mods=await pg.evaluate("MODULES.map(m=>m.id)")
    for mid in mods:
      await pg.click(f'.mod[data-m={mid}]')
      for step in range(40):
        # answer all on screen
        for _ in range(30):
          did=False
          # mcq
          btn=await pg.query_selector('button[data-act=mcq]:not([disabled])')
          if btn: await btn.click(); did=True; continue
          btn=await pg.query_selector('button[data-act=multi]:not([disabled])')
          if btn:
            await btn.click(); c=await pg.query_selector('button[data-act=multichk]:not([disabled])')
            if c: await c.click()
            did=True; continue
          btn=await pg.query_selector('button[data-act=ordadd]')
          if btn: await btn.click(); did=True; continue
          btn=await pg.query_selector('button[data-act=ordchk]:not([disabled])')
          if btn: await btn.click(); did=True; continue
          rows=await pg.query_selector_all('.srt-row')
          if rows:
            chips=await pg.query_selector_all('button[data-act=sort]:not([disabled])')
            if chips:
              # pick first chip of first row lacking a selection
              done=False
              for r in await pg.query_selector_all('.srt-row'):
                if not await r.query_selector('.chip.sel'):
                  ch=await r.query_selector('button[data-act=sort]:not([disabled])')
                  if ch: await ch.click(); done=True; break
              if done: did=True; continue
              c=await pg.query_selector('button[data-act=sortchk]:not([disabled])')
              if c: await c.click(); did=True; continue
          btn=await pg.query_selector('button[data-act=case]')
          if btn: await btn.click(); did=True; continue
          if not did: break
        if mid=='m01' and step==2: await pg.screenshot(path='shots/03_sort.png',full_page=True)
        if mid=='m02' and step==3: await pg.screenshot(path='shots/04_case.png',full_page=True)
        if mid=='m06' and step==4: await pg.screenshot(path='shots/05_megacode.png',full_page=True)
        if mid=='m07' and step==5: await pg.screenshot(path='shots/06_abg.png',full_page=True)
        if mid=='m12' and step==1: await pg.screenshot(path='shots/07_peds.png',full_page=True)
        nb=await pg.query_selector('#nextb')
        if not nb: break
        if await nb.is_disabled():
          errs.append(f'{mid} step {step} stuck: '+await pg.inner_text('#hint')); break
        await nb.click(); await pg.wait_for_timeout(60)
      await pg.screenshot(path=f'shots/end_{mid}.png')
      await pg.click('.top [data-act=home], .side [data-act=home] >> visible=true')
    await pg.fill('#nm','Lama Al-Ghamdi')
    await pg.click('button[data-act=cert] >> visible=true >> nth=0'); await pg.wait_for_timeout(300)
    await pg.screenshot(path='shots/08_cert.png',full_page=True)
    await pg.click('.top [data-act=home], .side [data-act=home] >> visible=true')
    await pg.click('button[data-act=pocket] >> visible=true >> nth=0'); await pg.screenshot(path='shots/09_pocket.png',full_page=True)
    print('ERRORS',errs)
    await b.close()
asyncio.run(main())
